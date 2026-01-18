package com.example.timetable.service;

import com.example.timetable.model.Exam;
import com.example.timetable.model.Exam.ExamStatus;
import com.example.timetable.repository.ExamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class ExamService {

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Get all exams with optional filters
    public List<Exam> getExams(Integer semester, String department, ExamStatus status) {
        org.springframework.data.mongodb.core.query.Query query = new org.springframework.data.mongodb.core.query.Query();

        if (semester != null) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("semester").is(semester));
        }
        if (department != null && !department.isEmpty()) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("department").is(department));
        }
        if (status != null) {
            query.addCriteria(org.springframework.data.mongodb.core.query.Criteria.where("status").is(status));
        }

        // Sort by semester, examDate, startTime
        query.with(org.springframework.data.domain.Sort.by(
                org.springframework.data.domain.Sort.Order.asc("semester"),
                org.springframework.data.domain.Sort.Order.asc("examDate"),
                org.springframework.data.domain.Sort.Order.asc("startTime")));

        return mongoTemplate.find(query, Exam.class);
    }

    // Schedule a new exam
    public Exam scheduleExam(Exam exam) {
        exam.setStatus(ExamStatus.DRAFT);
        return examRepository.save(exam);
    }

    // Update an existing exam (manual adjustment)
    public Exam updateExam(String id, Exam updates) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        // Allow editing published exams for corrections
        // if (exam.getStatus() == ExamStatus.PUBLISHED) {
        // throw new RuntimeException("Cannot modify a published exam");
        // }

        if (updates.getSemester() != null)
            exam.setSemester(updates.getSemester());
        if (updates.getDepartment() != null)
            exam.setDepartment(updates.getDepartment());
        if (updates.getCourseName() != null)
            exam.setCourseName(updates.getCourseName());
        if (updates.getExamDate() != null)
            exam.setExamDate(updates.getExamDate());
        if (updates.getStartTime() != null)
            exam.setStartTime(updates.getStartTime());
        if (updates.getEndTime() != null)
            exam.setEndTime(updates.getEndTime());
        if (updates.getHallId() != null)
            exam.setHallId(updates.getHallId());
        if (updates.getFacultyName() != null)
            exam.setFacultyName(updates.getFacultyName());
        if (updates.getDurationMinutes() != null)
            exam.setDurationMinutes(updates.getDurationMinutes());

        return examRepository.save(exam);
    }

    // Delete a draft exam
    public void deleteExam(String id) {
        Exam exam = examRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Exam not found"));

        // Allow deleting published exams
        // if (exam.getStatus() == ExamStatus.PUBLISHED) {
        // throw new RuntimeException("Cannot delete a published exam");
        // }

        examRepository.deleteById(id);
    }

    // Detect all conflicts
    public ConflictResult detectConflicts(Integer semester, String department) {
        List<Exam> exams = getExams(semester, department, null);
        List<Conflict> conflicts = new ArrayList<>();

        for (int i = 0; i < exams.size(); i++) {
            for (int j = i + 1; j < exams.size(); j++) {
                Exam e1 = exams.get(i);
                Exam e2 = exams.get(j);

                if (e1.conflictsWith(e2)) {
                    // Student conflict - same semester
                    if (e1.getSemester().equals(e2.getSemester())) {
                        conflicts.add(new Conflict(
                                "STUDENT",
                                String.format("Semester %d students have overlapping exams: %s and %s on %s",
                                        e1.getSemester(), e1.getCourseName(), e2.getCourseName(), e1.getExamDate()),
                                e1.getId(), e2.getId()));
                    }

                    // Hall conflict
                    if (e1.getHallId() != null && e1.getHallId().equals(e2.getHallId()) && !e1.getHallId().isEmpty()) {
                        conflicts.add(new Conflict(
                                "HALL",
                                String.format("Hall %s double-booked: %s and %s on %s",
                                        e1.getHallId(), e1.getCourseName(), e2.getCourseName(), e1.getExamDate()),
                                e1.getId(), e2.getId()));
                    }

                    // Faculty conflict
                    if (e1.getFacultyName() != null && e1.getFacultyName().equals(e2.getFacultyName())
                            && !e1.getFacultyName().isEmpty()) {
                        conflicts.add(new Conflict(
                                "FACULTY",
                                String.format("Faculty %s has overlapping duties: %s and %s on %s",
                                        e1.getFacultyName(), e1.getCourseName(), e2.getCourseName(), e1.getExamDate()),
                                e1.getId(), e2.getId()));
                    }
                }
            }
        }

        return new ConflictResult(conflicts.isEmpty(), conflicts);
    }

    // Auto-resolve conflicts by rescheduling
    public int autoResolveConflicts(Integer semester, String department) {
        List<Exam> exams = getExams(semester, department, null);
        exams.sort(Comparator.comparing(Exam::getExamDate).thenComparing(Exam::getStartTime));

        int resolved = 0;

        // Group by semester to resolve student conflicts
        Map<Integer, List<Exam>> bySemester = exams.stream()
                .collect(Collectors.groupingBy(Exam::getSemester));

        for (List<Exam> semesterExams : bySemester.values()) {
            for (int i = 0; i < semesterExams.size(); i++) {
                for (int j = i + 1; j < semesterExams.size(); j++) {
                    Exam e1 = semesterExams.get(i);
                    Exam e2 = semesterExams.get(j);

                    if (e1.conflictsWith(e2) && e2.getStatus() == ExamStatus.DRAFT) {
                        // Calculate duration
                        long durationMinutes = e2.getDurationMinutes() != null ? e2.getDurationMinutes() : 120;

                        // Move e2 to next slot (after e1 ends + 30 min break)
                        LocalTime newStart = e1.getEndTime().plusMinutes(30);
                        LocalTime newEnd = newStart.plusMinutes(durationMinutes);

                        // If past 6 PM, move to next day at 9 AM
                        if (newEnd.isAfter(LocalTime.of(18, 0))) {
                            e2.setExamDate(e2.getExamDate().plusDays(1));
                            e2.setStartTime(LocalTime.of(9, 0));
                            e2.setEndTime(LocalTime.of(9, 0).plusMinutes(durationMinutes));
                        } else {
                            e2.setStartTime(newStart);
                            e2.setEndTime(newEnd);
                        }

                        examRepository.save(e2);
                        resolved++;
                    }
                }
            }
        }

        return resolved;
    }

    // Publish and lock timetable
    public int publishTimetable(Integer semester, String department) {
        ConflictResult conflicts = detectConflicts(semester, department);
        if (!conflicts.isConflictFree()) {
            throw new RuntimeException("Cannot publish: Unresolved conflicts exist");
        }

        List<Exam> exams = getExams(semester, department, null);
        int published = 0;

        for (Exam exam : exams) {
            if (exam.getStatus() == ExamStatus.DRAFT) {
                exam.setStatus(ExamStatus.PUBLISHED);
                examRepository.save(exam);
                published++;
            }
        }

        return published;
    }

    // Get status counts
    public Map<String, Object> getStatus() {
        long total = examRepository.count();
        long published = examRepository.findByStatus(ExamStatus.PUBLISHED).size();
        long draft = total - published;

        String dbStatus = "Connected";
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
        } catch (Exception e) {
            dbStatus = "Disconnected";
        }

        return Map.of(
                "total", total,
                "published", published,
                "draft", draft,
                "isFullyPublished", total > 0 && draft == 0,
                "db", dbStatus,
                "backend", "OK");
    }

    // Get distinct departments
    public List<String> getDepartments() {
        return examRepository.findAll().stream()
                .map(Exam::getDepartment)
                .filter(d -> d != null && !d.isEmpty())
                .distinct()
                .sorted()
                .collect(Collectors.toList());
    }

    // Inner classes for results
    public static class Conflict {
        private String type;
        private String message;
        private String examId1;
        private String examId2;

        public Conflict(String type, String message, String examId1, String examId2) {
            this.type = type;
            this.message = message;
            this.examId1 = examId1;
            this.examId2 = examId2;
        }

        public String getType() {
            return type;
        }

        public String getMessage() {
            return message;
        }

        public String getExamId1() {
            return examId1;
        }

        public String getExamId2() {
            return examId2;
        }
    }

    public static class ConflictResult {
        private boolean conflictFree;
        private List<Conflict> conflicts;

        public ConflictResult(boolean conflictFree, List<Conflict> conflicts) {
            this.conflictFree = conflictFree;
            this.conflicts = conflicts;
        }

        public boolean isConflictFree() {
            return conflictFree;
        }

        public List<Conflict> getConflicts() {
            return conflicts;
        }
    }
}
