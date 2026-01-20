package com.example.timetable.repository;

import com.example.timetable.model.Exam;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ExamRepository extends MongoRepository<Exam, String> {

        List<Exam> findBySemester(Integer semester);

        List<Exam> findByExamDate(LocalDate examDate);

        List<Exam> findByStatus(Exam.ExamStatus status);

        List<Exam> findBySemesterAndStatus(Integer semester, Exam.ExamStatus status);

        List<Exam> findByExamDateAndHallId(LocalDate date, String hallId);

        List<Exam> findByExamDateAndFacultyName(LocalDate date, String facultyName);

        List<Exam> findAllByOrderBySemesterAscExamDateAscStartTimeAsc();
}
