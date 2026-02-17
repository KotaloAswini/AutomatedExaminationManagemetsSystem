package com.example.timetable;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private com.example.timetable.repository.UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        try {
            // Seed a test user for Module 1 ONLY
            if (userRepository.count() == 0) {
                com.example.timetable.model.User user = new com.example.timetable.model.User();
                user.setUsername("admin");
                user.setEmail("test@test.com");
                user.setPassword("admin123");
                userRepository.save(user);
                System.out.println("✓ Module 1: Default test user created (admin / test@test.com)");
            }
        } catch (Exception e) {
            System.out.println("⚠ MongoDB not connected. App will work without database persistence.");
            System.out.println("  Start MongoDB and restart the app to enable data saving.");
        }
    }
}
