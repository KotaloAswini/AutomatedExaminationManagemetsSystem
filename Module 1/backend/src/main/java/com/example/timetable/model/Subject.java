package com.example.timetable.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "subjects")
public class Subject {
    @Id
    private String name;
    private Integer semester;
    private Integer lectureCount;
    private String subjectCode;
    private String subjectType;

    public Subject() {
    }

    public Subject(String name, Integer semester, Integer lectureCount, String subjectCode, String subjectType) {
        this.name = name;
        this.semester = semester;
        this.lectureCount = lectureCount;
        this.subjectCode = subjectCode;
        this.subjectType = subjectType;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getSem() {
        return semester;
    }

    public void setSem(Integer semester) {
        this.semester = semester;
    }

    public Integer getLectureCount() {
        return lectureCount;
    }

    public void setLectureCount(Integer lectureCount) {
        this.lectureCount = lectureCount;
    }

    public String getSubjectCode() {
        return subjectCode;
    }

    public void setSubjectCode(String subjectCode) {
        this.subjectCode = subjectCode;
    }

    public String getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(String subjectType) {
        this.subjectType = subjectType;
    }
}
