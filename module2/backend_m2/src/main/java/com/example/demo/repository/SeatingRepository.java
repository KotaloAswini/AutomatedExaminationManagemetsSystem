package com.example.demo.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

@Repository
public class SeatingRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public void deleteByExam(String exam) {
        jdbcTemplate.update("DELETE FROM seating WHERE exam = ?", exam);
    }

    public void insertSeat(String usn, String room, int row, int col, String exam) {
        jdbcTemplate.update(
            "INSERT INTO seating (usn, room_name, row_no, col_no, exam) VALUES (?, ?, ?, ?, ?)",
            usn, room, row, col, exam
        );
    }
}