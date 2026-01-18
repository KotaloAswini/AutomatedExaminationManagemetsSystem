package com.example.timetable.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Document(collection = "timetable_structures")
@NoArgsConstructor
@AllArgsConstructor
public class TimeTableStructure {
    @Id
    private String id;

    private String breaksPerSemesterJson;

    private int periodCount;

    private String sectionsPerSemesterJson;

    private int semesterCount;
    private int dayCount;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getBreaksPerSemesterJson() {
        return breaksPerSemesterJson;
    }

    public void setBreaksPerSemesterJson(String breaksPerSemesterJson) {
        this.breaksPerSemesterJson = breaksPerSemesterJson;
    }

    public int getPeriodCount() {
        return periodCount;
    }

    public void setPeriodCount(int periodCount) {
        this.periodCount = periodCount;
    }

    public String getSectionsPerSemesterJson() {
        return sectionsPerSemesterJson;
    }

    public void setSectionsPerSemesterJson(String sectionsPerSemesterJson) {
        this.sectionsPerSemesterJson = sectionsPerSemesterJson;
    }

    public int getSemesterCount() {
        return semesterCount;
    }

    public void setSemesterCount(int semesterCount) {
        this.semesterCount = semesterCount;
    }

    public int getDayCount() {
        return dayCount;
    }

    public void setDayCount(int dayCount) {
        this.dayCount = dayCount;
    }
}
