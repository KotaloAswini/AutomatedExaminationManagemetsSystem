package com.example.demo.service;

import com.example.demo.model.Student;
import java.util.*;

public class SeatAllotmentService {

    public Map<String, Integer> allocateSeats(List<Student> students) {
        Map<String, Integer> seating = new LinkedHashMap<>();
        int seat = 1;

        for (Student s : students) {
            seating.put(s.rollNo, seat);
            seat += 2; // alternate seating
        }
        return seating;
    }
}
