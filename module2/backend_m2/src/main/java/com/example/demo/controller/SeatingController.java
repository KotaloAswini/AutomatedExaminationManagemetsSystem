package com.example.demo.controller;

import com.example.demo.service.SeatingData;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class SeatingController {

    @GetMapping("/seating")
public Map<String, List<String>> generateSeating() {

    // ⭐ DO NOT regenerate if already exists
    if (!SeatingData.seating.isEmpty()) {
        return SeatingData.seating;
    }

    Map<String, List<String>> seating = SeatingData.seating;


        List<String> students = new ArrayList<>();

        // Generate students from 3 sems
        for (int i = 1; i <= 272; i++) {
            students.add(String.format("1NT23CS%03d", i));
            students.add(String.format("1NT24CS%03d", i));
            students.add(String.format("1NT25CS%03d", i));
        }

        // ⭐ Shuffle ONLY ONCE
        Collections.shuffle(students);

        int index = 0;

        // ✅ 12 Classes (48 students each)
        for (int c = 1; c <= 12; c++) {

            List<String> classStudents = new ArrayList<>();

            for (int i = 0; i < 48 && index < students.size(); i++) {
                classStudents.add(students.get(index++));
            }

            seating.put("Class " + c, classStudents);
        }
// ✅ 8 Labs (30 students each)
        for (int l = 1; l <= 8; l++) {

            List<String> labStudents = new ArrayList<>();

            for (int i = 0; i < 30 && index < students.size(); i++) {
                labStudents.add(students.get(index++));
            }

            seating.put("Lab " + l, labStudents);
        }



        return seating;
    }
}  