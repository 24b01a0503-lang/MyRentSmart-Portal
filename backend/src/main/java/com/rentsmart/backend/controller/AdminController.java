package com.rentsmart.backend.controller;

import com.rentsmart.backend.entity.Booking;
import com.rentsmart.backend.entity.Property;
import com.rentsmart.backend.entity.User;
import com.rentsmart.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return adminService.getAllUsers();
    }

    @GetMapping("/properties")
    public List<Property> getAllProperties() {
        return adminService.getAllProperties();
    }

    @GetMapping("/bookings")
    public List<Booking> getAllBookings() {
        return adminService.getAllBookings();
    }

    @DeleteMapping("/users/{id}")
    public String deleteUser(@PathVariable Long id) {
        adminService.deleteUser(id);
        return "User deleted successfully";
    }

    @DeleteMapping("/properties/{id}")
    public String deleteProperty(@PathVariable Long id) {
        adminService.deleteProperty(id);
        return "Property deleted successfully";
    }

    @DeleteMapping("/bookings/{id}")
    public String deleteBooking(@PathVariable Long id) {
        adminService.deleteBooking(id);
        return "Booking deleted successfully";
    }
}