package com.example.timetable.controller;

import com.example.timetable.model.Schedule;
import com.example.timetable.repository.ScheduleRepository;
import com.example.timetable.model.TimeTableStructure;
import com.example.timetable.repository.TimeTableStructureRepository;
import com.example.timetable.model.Subject;
import com.example.timetable.repository.SubjectRepository;
import com.example.timetable.model.Teacher;
import com.example.timetable.repository.TeacherRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/io/schedule")
@CrossOrigin(origins = "*")
public class ScheduleController {

    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private TimeTableStructureRepository structureRepository;

    @Autowired
    private SubjectRepository subjectRepository;

    @Autowired
    private TeacherRepository teacherRepository;

    private final ObjectMapper objectMapper = new ObjectMapper();

    @GetMapping
    public Object getSchedule(@RequestParam(required = false) Boolean generateNew) {
        if (Boolean.TRUE.equals(generateNew)) {
            generateNewScheduleLogic();
        }
        return buildFullTimeTable();
    }

    @PutMapping
    public void saveSchedule(@RequestParam int year, @RequestParam int sec, @RequestBody Object timetableData) {
        try {
            String json = objectMapper.writeValueAsString(timetableData);
            Schedule schedule = scheduleRepository.findByYearAndSection(year, sec)
                    .orElse(new Schedule());
            schedule.setYear(year);
            schedule.setSection(sec);
            schedule.setTimetableJson(json);
            scheduleRepository.save(schedule);
        } catch (Exception e) {
            throw new RuntimeException("Error saving schedule", e);
        }
    }

    @GetMapping("/structure")
    public TimeTableStructure getStructure() {
        return structureRepository.findAll().stream().findFirst().orElse(null);
    }

    @PutMapping("/structure")
    public TimeTableStructure saveStructure(@RequestBody TimeTableStructure structure) {
        TimeTableStructure existing = structureRepository.findAll().stream().findFirst().orElse(null);
        if (existing != null) {
            structure.setId(existing.getId());
        }
        return structureRepository.save(structure);
    }

    private Object buildFullTimeTable() {
        TimeTableStructure structure = getStructure();
        if (structure == null)
            return new ArrayList<>();

        int semCount = structure.getSemesterCount();
        List<Integer> sectionsPerSem = parseJsonToList(structure.getSectionsPerSemesterJson());

        List<List<Object>> fullTable = new ArrayList<>();

        for (int sem = 0; sem < semCount; sem++) {
            List<Object> sectionList = new ArrayList<>();
            int sections = (sectionsPerSem != null && sem < sectionsPerSem.size())
                    ? sectionsPerSem.get(sem)
                    : 1;
            // The logic above was a bit buggy, let's fix
            sections = (sectionsPerSem != null && sem < sectionsPerSem.size()) ? sectionsPerSem.get(sem) : 1;
            if (sections == 0)
                sections = 1; // Sanity check

            for (int sec = 0; sec < sections; sec++) {
                Optional<Schedule> scheduleOpt = scheduleRepository.findByYearAndSection(sem + 1, sec + 1);
                if (scheduleOpt.isPresent()) {
                    try {
                        sectionList.add(objectMapper.readValue(scheduleOpt.get().getTimetableJson(), Object.class));
                    } catch (Exception e) {
                        sectionList.add(new ArrayList<>());
                    }
                } else {
                    sectionList.add(new ArrayList<>());
                }
            }
            fullTable.add(sectionList);
        }
        return fullTable;
    }

    private List<Integer> parseJsonToList(String json) {
        if (json == null)
            return null;
        try {
            return objectMapper.readValue(json, new com.fasterxml.jackson.core.type.TypeReference<List<Integer>>() {
            });
        } catch (Exception e) {
            return null;
        }
    }

    private void generateNewScheduleLogic() {
        // Implementation of simple greedy algorithm for Module 1
        TimeTableStructure structure = getStructure();
        if (structure == null)
            return;

        List<Subject> subjects = subjectRepository.findAll();
        List<Teacher> teachers = teacherRepository.findAll();

        int semCount = structure.getSemesterCount();
        int dayCount = structure.getDayCount();
        int periodCount = structure.getPeriodCount();
        List<Integer> sectionsPerSem = parseJsonToList(structure.getSectionsPerSemesterJson());

        // For each sem-section, clear and regenerate
        for (int sem = 1; sem <= semCount; sem++) {
            int sections = (sectionsPerSem != null && (sem - 1) < sectionsPerSem.size()) ? sectionsPerSem.get(sem - 1)
                    : 1;
            if (sections == 0)
                sections = 1;

            for (int sec = 1; sec <= sections; sec++) {
                // Generate a matrix (day x period)
                // Matrix elements: [teacherName, subjectName, roomCode]
                List<List<List<String>>> matrix = new ArrayList<>();
                for (int d = 0; d < dayCount; d++) {
                    List<List<String>> row = new ArrayList<>();
                    for (int p = 0; p < periodCount; p++) {
                        row.add(null);
                    }
                    matrix.add(row);
                }

                // Simplified greedy filling:
                // For each subject in this semester, allocate its lecture count
                int currentDay = 0;
                int currentPeriod = 0;

                for (Subject sub : subjects) {
                    if (sub.getSem() == sem) {
                        int count = sub.getLectureCount();
                        for (int i = 0; i < count; i++) {
                            // Find a teacher for this subject
                            Teacher assignedTeacher = teachers.stream()
                                    .filter(t -> t.getSubjectNames().contains(sub.getName()))
                                    .findFirst().orElse(null);

                            String teacherName = assignedTeacher != null ? assignedTeacher.getName() : "Unknown";
                            // Room codes not yet implemented in Subject model
                            String roomCode = "";

                            // Find next empty slot
                            while (currentDay < dayCount && matrix.get(currentDay).get(currentPeriod) != null) {
                                currentPeriod++;
                                if (currentPeriod >= periodCount) {
                                    currentPeriod = 0;
                                    currentDay++;
                                }
                            }

                            if (currentDay < dayCount) {
                                matrix.get(currentDay).set(currentPeriod,
                                        Arrays.asList(teacherName, sub.getName(), roomCode));
                            }
                        }
                    }
                }

                try {
                    String json = objectMapper.writeValueAsString(matrix);
                    Schedule schedule = scheduleRepository.findByYearAndSection(sem, sec).orElse(new Schedule());
                    schedule.setYear(sem);
                    schedule.setSection(sec);
                    schedule.setTimetableJson(json);
                    scheduleRepository.save(schedule);
                } catch (Exception e) {
                }
            }
        }
    }
}
