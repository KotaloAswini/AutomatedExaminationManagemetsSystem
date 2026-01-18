package com.example.timetable.controller;

import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
@RequestMapping("/io/config")
@CrossOrigin(origins = "*")
public class ConfigController {

    @GetMapping("/global/{key}")
    public String getConfig(@PathVariable String key) {
        if ("theme".equals(key))
            return "\"light\"";
        return "\"\"";
    }

    @PutMapping("/global/{key}")
    public void saveConfig(@PathVariable String key, @RequestBody String value) {
        // Dummy save
    }
}
