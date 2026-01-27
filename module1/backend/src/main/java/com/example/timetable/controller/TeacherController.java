package com.example.timetable.controller;

import com.example.timetable.model.Teacher;
import com.example.timetable.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/io/teachers")
@CrossOrigin(origins = "*")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }

    @GetMapping("/{name}")
    public Teacher getTeacher(@PathVariable String name) {
        return teacherRepository.findById(name).orElse(null);
    }

    @PutMapping("/{name}")
    public Teacher saveTeacher(@PathVariable String name, @RequestBody Teacher teacher) {
        teacher.setName(name);
        return teacherRepository.save(teacher);
    }

    @DeleteMapping("/{name}")
    public void deleteTeacher(@PathVariable String name) {
        teacherRepository.deleteById(name);
    }
}
