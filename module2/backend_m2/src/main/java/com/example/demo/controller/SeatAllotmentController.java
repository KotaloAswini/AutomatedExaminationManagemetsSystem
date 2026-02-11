package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/seats")
public class SeatAllotmentController {

    @GetMapping("/find")
    public Map<String, String> findSeat(@RequestParam String usn) {

        Map<String, String> result = new LinkedHashMap<>();

        try {
            usn = usn.toUpperCase();
            int rollNumber = Integer.parseInt(usn.substring(usn.length() - 3));

            int studentsPerRoom = 25;
            int totalRooms = 12;
            int totalStudents = studentsPerRoom * totalRooms;

            if (rollNumber < 1 || rollNumber > totalStudents) {
                result.put("error", "USN not allocated");
                return result;
            }

            int roomNo = (rollNumber - 1) / studentsPerRoom + 1;
            int seatNo = (rollNumber - 1) % studentsPerRoom + 1;

            result.put("USN", usn);
            result.put("Room", "Room " + String.format("%03d", roomNo));
            result.put("Seat", "Seat " + seatNo);

            return result;

        } catch (Exception e) {
            result.put("error", "Invalid USN");
            return result;
        }
    }
}
