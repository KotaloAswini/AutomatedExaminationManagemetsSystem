package com.example.timetable.repository;

import com.example.timetable.model.TimeTableStructure;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TimeTableStructureRepository extends MongoRepository<TimeTableStructure, String> {
}
