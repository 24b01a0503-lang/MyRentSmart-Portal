package com.rentsmart.backend.controller;

import com.rentsmart.backend.dto.DashboardResponse;
import com.rentsmart.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/admin")
    public DashboardResponse getAdminDashboard() {

        return dashboardService.getDashboardDetails();

    }

}