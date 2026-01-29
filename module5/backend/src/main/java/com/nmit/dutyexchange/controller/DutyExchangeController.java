package com.nmit.dutyexchange.controller;

import com.nmit.dutyexchange.model.DutyExchange;
import com.nmit.dutyexchange.service.DutyExchangeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/duty-exchange")
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend access
public class DutyExchangeController {

    @Autowired
    private DutyExchangeService service;

    @PostMapping
    public ResponseEntity<DutyExchange> createExchange(@RequestBody DutyExchange exchange) {
        return ResponseEntity.ok(service.createExchange(exchange));
    }

    @GetMapping
    public ResponseEntity<List<DutyExchange>> getAllExchanges() {
        return ResponseEntity.ok(service.getAllExchanges());
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<DutyExchange> updateStatus(@PathVariable String id, @RequestBody String status) {
        // Simple string body might come with quotes, clean it if necessary or change to DTO. 
        // For simplicity assuming raw string or simple JSON.
        // Better to use a DTO or @RequestParam, but keeping it flexible.
        String cleanStatus = status.replaceAll("\"", "");
        DutyExchange updated = service.updateStatus(id, cleanStatus);
        if (updated != null) {
            return ResponseEntity.ok(updated);
        }
        return ResponseEntity.notFound().build();
    }
    
    // Add endpoint to handle update status via query param for easier testing if needed
    @PostMapping("/{id}/approve")
    public ResponseEntity<DutyExchange> approve(@PathVariable String id) {
       return ResponseEntity.ok(service.updateStatus(id, "APPROVED"));
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<DutyExchange> reject(@PathVariable String id) {
        return ResponseEntity.ok(service.updateStatus(id, "REJECTED"));
    }
}
