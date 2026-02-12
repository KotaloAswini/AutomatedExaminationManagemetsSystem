package com.example.timetable.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.NoArgsConstructor;

import java.util.List;

@Document(collection = "teachers")
@NoArgsConstructor
public class Teacher {
    @Id
    private String name;

    private List<String> subjectNames;

    private String availabilityJson;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<String> getSubjectNames() {
        return subjectNames;
    }

    public void setSubjectNames(List<String> subjectNames) {
        this.subjectNames = subjectNames;
    }

    public String getAvailabilityJson() {
        return availabilityJson;
    }

    public void setAvailabilityJson(String availabilityJson) {
        this.availabilityJson = availabilityJson;
    }
}
