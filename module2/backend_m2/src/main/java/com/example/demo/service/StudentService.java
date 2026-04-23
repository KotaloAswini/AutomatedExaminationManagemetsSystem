package com.example.demo.service;

import com.example.demo.model.Student;
import org.springframework.stereotype.Service;

import java.sql.*;
import java.util.*;

@Service
public class StudentService {

    public List<Student> getAllStudents() {

        List<Student> students = new ArrayList<>();

        try (Connection conn = DriverManager.getConnection(
                "jdbc:mysql://127.0.0.1:3306/seating_db", "root", "Chandana@27")) {

            String query = "SELECT * FROM student";
            PreparedStatement stmt = conn.prepareStatement(query);

            ResultSet rs = stmt.executeQuery();

            while (rs.next()) {
                students.add(new Student(
                        rs.getInt("id"),
                        rs.getString("usn")   // ✅ IMPORTANT
                ));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return students;
    }
}