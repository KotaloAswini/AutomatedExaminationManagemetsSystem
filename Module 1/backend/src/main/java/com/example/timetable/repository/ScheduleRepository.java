package com.example.timetable.repository;

import com.example.timetable.model.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScheduleRepository extends MongoRepository<Schedule, String> {
    Optional<Schedule> findByYearAndSection(int year, int section);
}
