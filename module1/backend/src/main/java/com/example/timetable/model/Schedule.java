package com.example.timetable.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.NoArgsConstructor;

@Document(collection = "schedules")
@NoArgsConstructor
public class Schedule {
    @Id
    private String id;

    private int year;
    private int section;

    private String timetableJson;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getSection() {
        return section;
    }

    public void setSection(int section) {
        this.section = section;
    }

    public String getTimetableJson() {
        return timetableJson;
    }

    public void setTimetableJson(String timetableJson) {
        this.timetableJson = timetableJson;
    }
}
