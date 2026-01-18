package com.example.timetable.controller;

import com.example.timetable.model.Exam;
import com.example.timetable.model.Exam.ExamStatus;
import com.example.timetable.service.ExamService;
import com.example.timetable.service.ExamService.ConflictResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.mongodb.core.MongoTemplate;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@RestController
@RequestMapping("/api/exams")
@CrossOrigin(origins = "*")
public class ExamController {

    @Autowired
    private ExamService examService;

    @Autowired
    private MongoTemplate mongoTemplate;

    // Get all exams with optional filters
    @GetMapping
    public List<Exam> getAllExams(
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String department,
            @RequestParam(required = false) ExamStatus status) {
        return examService.getExams(semester, department, status);
    }

    // Schedule a new exam
    @PostMapping
    public ResponseEntity<?> scheduleExam(@RequestBody ExamRequest request) {
        try {
            Exam exam = new Exam();
            exam.setSemester(request.semester);
            exam.setCourseName(request.courseName);
            exam.setExamDate(LocalDate.parse(request.examDate));
            exam.setStartTime(LocalTime.parse(request.startTime));
            exam.setEndTime(LocalTime.parse(request.endTime));
            exam.setHallId(request.hallId);
            exam.setFacultyName(request.facultyName);
            exam.setDepartment(request.department);
            exam.setDurationMinutes(request.durationMinutes != null ? request.durationMinutes : 120);

            Exam saved = examService.scheduleExam(exam);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Update exam (manual adjustment)
    // Update exam (manual adjustment)
    @PutMapping("/{id}")
    public ResponseEntity<?> updateExam(@PathVariable String id, @RequestBody ExamRequest request) {
        try {
            Exam updates = new Exam();
            if (request.semester != null)
                updates.setSemester(request.semester);
            if (request.courseName != null)
                updates.setCourseName(request.courseName);
            if (request.department != null)
                updates.setDepartment(request.department);
            if (request.examDate != null)
                updates.setExamDate(LocalDate.parse(request.examDate));
            if (request.startTime != null)
                updates.setStartTime(LocalTime.parse(request.startTime));
            if (request.endTime != null)
                updates.setEndTime(LocalTime.parse(request.endTime));
            if (request.durationMinutes != null)
                updates.setDurationMinutes(request.durationMinutes);
            updates.setHallId(request.hallId);
            updates.setFacultyName(request.facultyName);

            Exam updated = examService.updateExam(id, updates);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Delete exam
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteExam(@PathVariable String id) {
        try {
            examService.deleteExam(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Detect conflicts
    @GetMapping("/conflicts")
    public ResponseEntity<ConflictResult> detectConflicts(
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String department) {
        return ResponseEntity.ok(examService.detectConflicts(semester, department));
    }

    // Auto-resolve conflicts
    @PostMapping("/auto-resolve")
    public ResponseEntity<?> autoResolve(
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String department) {
        try {
            int resolved = examService.autoResolveConflicts(semester, department);
            return ResponseEntity.ok(Map.of(
                    "resolved", resolved,
                    "message", resolved > 0 ? "Resolved " + resolved + " conflicts" : "No conflicts to resolve"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Publish timetable
    @PutMapping("/publish")
    public ResponseEntity<?> publish(
            @RequestParam(required = false) Integer semester,
            @RequestParam(required = false) String department) {
        try {
            int published = examService.publishTimetable(semester, department);
            return ResponseEntity.ok(Map.of(
                    "published", published,
                    "message", "Published " + published + " exam(s)"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    // Get status
    @GetMapping("/status")
    public ResponseEntity<?> getStatus() {
        Map<String, Object> stats = new HashMap<>(examService.getStatus());

        // Ensure connectivity keys are present
        stats.put("backend", "OK");
        stats.put("debug_version", "v1.1-direct");

        String dbStatus = "Connected";
        try {
            mongoTemplate.getDb().runCommand(new org.bson.Document("ping", 1));
        } catch (Exception e) {
            dbStatus = "Disconnected";
            stats.put("db_error", e.getMessage());
        }
        stats.put("db", dbStatus);

        return ResponseEntity.ok(stats);
    }

    // Get departments list
    @GetMapping("/departments")
    public List<String> getDepartments() {
        return examService.getDepartments();
    }

    // DTO for requests
    static class ExamRequest {
        public Integer semester;
        public String courseName;
        public String examDate;
        public String startTime;
        public String endTime;
        public String hallId;
        public String facultyName;
        public String department;
        public Integer durationMinutes;
    }
}
