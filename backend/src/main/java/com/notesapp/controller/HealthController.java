package com.notesapp.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

/** Lightweight health check used by Render / Railway / Docker. */
@RestController
public class HealthController {

    @GetMapping({"/health", "/api/health"})
    public Map<String, String> health() {
        return Map.of("status", "UP");
    }
}
