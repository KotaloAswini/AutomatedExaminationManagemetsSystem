package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;
import java.sql.*;

import com.example.demo.service.SeatAllotmentService;
import com.example.demo.service.StudentService;
import com.example.demo.model.Student;

import org.springframework.beans.factory.annotation.Autowired;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/seats")
public class SeatAllotmentController {
     @GetMapping
    public Map<String, String> home() {
        Map<String, String> response = new LinkedHashMap<>();

        response.put("message", "Seat Allotment API is running 🚀");
        response.put("available APIs", "/seats/find, /seats/layout, /seats/generate");

        return response;
    }

    @Autowired
    private SeatAllotmentService seatService;

    @Autowired
    private StudentService studentService;

    // 🔥 GENERATE SEATING
    @GetMapping("/generate")
    public String generateSeating(@RequestParam String exam) {

        if (exam == null || exam.isEmpty()) {
            return "Please provide exam name";
        }

        List<Student> students = studentService.getAllStudents();

        System.out.println("Students fetched = " + students.size());

        seatService.generateAndSave(students, exam);

        return "Seating Generated for " + exam;
    }

    // 🔍 FIND SEAT
    @GetMapping("/find")
    public Map<String, String> findSeat(
            @RequestParam String usn,
            @RequestParam String exam) {

        Map<String, String> result = new LinkedHashMap<>();

        // ✅ validation
        if (exam == null || exam.isEmpty()) {
            result.put("error", "Please select exam");
            return result;
        }

        usn = usn.toUpperCase();

        try (Connection conn = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/seating_db", "root", "Chandana@27")) {

            String query = "SELECT * FROM seating WHERE usn = ? AND exam = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, usn);
            stmt.setString(2, exam);

            ResultSet rs = stmt.executeQuery();

            if (rs.next()) {

                int row = rs.getInt("row_no");
int col = rs.getInt("col_no");
int seat = (row - 1) * 6 + col;

// 🔥 SUBJECT LOGIC
String subject = "";

if (usn.startsWith("1NT23")) {
    subject = "Operating Systems";
} 
else if (usn.startsWith("1NT24")) {
    subject = "Data Structures";
} 
else if (usn.startsWith("1NT25")) {
    subject = "Cyber Security";
} 
else {
    subject = "Unknown";
}

// ✅ UPDATED RESPONSE
result.put("USN", usn);
result.put("Room", rs.getString("room_name"));
result.put("Seat", String.valueOf(seat));
result.put("Row", String.valueOf(row));
result.put("Subject", subject);   // 👈 NEW

                return result;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        result.put("error", "Student not allocated for this exam");
        return result;
    }

    // 🧱 LAYOUT
    @GetMapping("/layout")
    public List<Map<String, Object>> getLayout(
            @RequestParam String room,
            @RequestParam String exam) {

        List<Map<String, Object>> result = new ArrayList<>();

        // ✅ validation
        if (exam == null || exam.isEmpty()) {
            return result;
        }

        try (Connection conn = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/seating_db", "root", "Chandana@27")) {

            String query = "SELECT usn, row_no, col_no FROM seating WHERE room_name = ? AND exam = ?";
            PreparedStatement stmt = conn.prepareStatement(query);
            stmt.setString(1, room);
            stmt.setString(2, exam);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                Map<String, Object> seat = new HashMap<>();
                seat.put("usn", rs.getString("usn"));
                seat.put("row", rs.getInt("row_no"));
                seat.put("col", rs.getInt("col_no"));
                result.add(seat);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return result;
    }
}