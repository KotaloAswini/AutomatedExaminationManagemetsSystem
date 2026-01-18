package com.example.timetable;

import com.example.timetable.model.TimeTableStructure;
import com.example.timetable.repository.TimeTableStructureRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private TimeTableStructureRepository repository;

    @Override
    public void run(String... args) throws Exception {
        try {
            if (repository.count() == 0) {
                TimeTableStructure structure = new TimeTableStructure();
                structure.setSemesterCount(4);
                structure.setDayCount(5);
                structure.setPeriodCount(9);
                structure.setBreaksPerSemesterJson("[[4,5],[5],[5],[5]]");
                structure.setSectionsPerSemesterJson("[1,1,1,1]");
                repository.save(structure);
                System.out.println("✓ Default timetable structure initialized in MongoDB");
            } else {
                System.out.println("✓ Connected to MongoDB - existing data found");
            }
        } catch (Exception e) {
            System.out.println("⚠ MongoDB not connected. App will work without database persistence.");
            System.out.println("  Start MongoDB and restart the app to enable data saving.");
        }
    }
}
