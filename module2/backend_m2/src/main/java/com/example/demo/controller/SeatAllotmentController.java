package com.example.demo.controller;

import com.example.demo.service.SeatingData;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("/seats")
public class SeatAllotmentController {

    @GetMapping("/find")
    public Map<String, String> findSeat(@RequestParam String usn) {

        usn = usn.toUpperCase();
        Map<String, String> result = new LinkedHashMap<>();

        // 🚨 VERY IMPORTANT
        // If seating not generated yet → block search
        if (SeatingData.seating.isEmpty()) {

            result.put("error", "Seating not generated yet. Open /seating first.");
            return result;
        }

        Map<String, List<String>> seating = SeatingData.seating;

        for (Map.Entry<String, List<String>> entry : seating.entrySet()) {

            String room = entry.getKey();
            List<String> students = entry.getValue();

            if (students.contains(usn)) {

                int seatNo = students.indexOf(usn) + 1;

                result.put("USN", usn);
                result.put("Room", room);
                result.put("Seat", String.valueOf(seatNo));

                return result;
            }
        }

        // ✅ BLOCK FAKE USN
        result.put("error", "Student not allocated to any exam hall");
        return result;
    }
}
