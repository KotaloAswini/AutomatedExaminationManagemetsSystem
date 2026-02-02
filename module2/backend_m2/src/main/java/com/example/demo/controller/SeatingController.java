package com.example.demo.controller;

import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SeatingController {

    @GetMapping("/seating")
    public Map<String, List<String>> generateSeating() {

        int totalStudents = 300;
        int studentsPerRoom = 30;
        int totalRooms = totalStudents / studentsPerRoom; // 10 rooms

        // Generate USN list: 1NT22CS001 to 1NT22CS300
        List<String> students = new ArrayList<>();
        for (int i = 1; i <= totalStudents; i++) {
            students.add(String.format("1NT22CS%03d", i));
        }

        Map<String, List<String>> seating = new LinkedHashMap<>();

        int studentIndex = 0;

        // Allocate students room-wise
        for (int room = 1; room <= totalRooms; room++) {
            List<String> roomStudents = new ArrayList<>();

            for (int i = 0; i < studentsPerRoom; i++) {
                roomStudents.add(students.get(studentIndex));
                studentIndex++;
            }

            seating.put("Lab " + room, roomStudents);
        }

        return seating;
    }
}
