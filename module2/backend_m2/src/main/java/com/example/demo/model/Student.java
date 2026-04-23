package com.example.demo.model;

public class Student {

    public int id;
    public String usn;   // ✅ MUST match DB column name

    // Constructor
    public Student(int id, String usn) {
        this.id = id;
        this.usn = usn;
    }

    // Optional getters (good practice)
    public int getId() {
        return id;
    }

    public String getUsn() {
        return usn;
    }
}