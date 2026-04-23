package com.example.demo.service;

import com.example.demo.model.Student;
import com.example.demo.repository.SeatingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class SeatAllotmentService {

    @Autowired
    private SeatingRepository seatingRepository;

    // 🔥 STEP 1: MIX STUDENTS (23 → 24 → 25 pattern)
    public List<Student> generateMixedList(List<Student> students) {

        List<Student> s23 = new ArrayList<>();
        List<Student> s24 = new ArrayList<>();
        List<Student> s25 = new ArrayList<>();

        // split by batch
        for (Student s : students) {
            if (s.usn.contains("1NT23")) s23.add(s);
            else if (s.usn.contains("1NT24")) s24.add(s);
            else if (s.usn.contains("1NT25")) s25.add(s);
        }

       // Shuffle each group for randomness

        Collections.shuffle(s23);
        Collections.shuffle(s24);
        Collections.shuffle(s25);

        List<Student> mixed = new ArrayList<>();
         // Find max size among all groups
        int max = Math.max(s23.size(), Math.max(s24.size(), s25.size()));

          // Mix students alternately (23 → 24 → 25)
        for (int i = 0; i < max; i++) {
            if (i < s23.size()) mixed.add(s23.get(i));
            if (i < s24.size()) mixed.add(s24.get(i));
            if (i < s25.size()) mixed.add(s25.get(i));
        }

        return mixed;
    }

    // 🔥 STEP 2: GENERATE + SAVE SEATING
    public void generateAndSave(List<Student> students, String exam) {

        List<Student> mixed = generateMixedList(students);

        String[] rooms = {
                "Class 1","Class 2","Class 3","Class 4",
                "Class 5","Class 6","Class 7","Class 8",
                "Class 9","Class 10","Class 11","Class 12",
                "Lab 1","Lab 2","Lab 3","Lab 4",
                "Lab 5","Lab 6","Lab 7","Lab 8"
        };

        // delete old data for this exam
        seatingRepository.deleteByExam(exam);

        int index = 0;

        for (String room : rooms) {

            int rows = room.contains("Lab") ? 5 : 8;
            int cols = 6;

            for (int r = 1; r <= rows; r++) {
                for (int c = 1; c <= cols; c++) {

                    if (index >= mixed.size()) return;

                    Student s = mixed.get(index++);
                    
            
                    seatingRepository.insertSeat( s.usn, room, r, c, exam);
                }
            }
        }
    }
}