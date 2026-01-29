package com.nmit.dutyexchange.service;

import com.nmit.dutyexchange.model.DutyExchange;
import com.nmit.dutyexchange.repository.DutyExchangeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class DutyExchangeService {

    @Autowired
    private DutyExchangeRepository repository;

    public DutyExchange createExchange(DutyExchange exchange) {
        exchange.setStatus("PENDING");
        exchange.setHodApproval("PENDING");
        exchange.setRequestDate(LocalDate.now().toString());
        return repository.save(exchange);
    }

    public List<DutyExchange> getAllExchanges() {
        return repository.findAll();
    }
    
    public DutyExchange updateStatus(String id, String status) {
        return repository.findById(id).map(exchange -> {
            exchange.setStatus(status);
            exchange.setHodApproval(status); // Syncing for now as per requirement implied
            return repository.save(exchange);
        }).orElse(null);
    }
}
