package com.example.timetable.controller;

import com.example.timetable.model.Subject;
import com.example.timetable.repository.SubjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/io/subjects")
@CrossOrigin(origins = "*")
public class SubjectController {

    @Autowired
    private SubjectRepository subjectRepository;

    @GetMapping
    public List<Subject> getAllSubjects() {
        return subjectRepository.findAll();
    }

    @GetMapping("/codes")
    public List<String> getSubjectCodes() {
        return subjectRepository.findAll().stream()
                .map(Subject::getName)
                .collect(Collectors.toList());
    }

    @GetMapping("/{name}")
    public Subject getSubject(@PathVariable String name) {
        return subjectRepository.findById(name).orElse(null);
    }

    @PutMapping("/{name}")
    public Subject saveSubject(@PathVariable String name, @RequestBody Subject subject) {
        subject.setName(name);
        return subjectRepository.save(subject);
    }

    @DeleteMapping("/{name}")
    public void deleteSubject(@PathVariable String name) {
        subjectRepository.deleteById(name);
    }
}
