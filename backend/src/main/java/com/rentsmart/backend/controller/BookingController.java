package com.rentsmart.backend.controller;

import com.rentsmart.backend.entity.Booking;
import com.rentsmart.backend.service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingService bookingService;

    @PostMapping
    public Booking bookProperty(@RequestBody Booking booking) {
        return bookingService.bookProperty(booking);
    }

    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/tenant/{email}")
    public List<Booking> getTenantBookings(@PathVariable String email) {
        return bookingService.getBookingsByTenant(email);
    }

    @GetMapping("/owner/{email}")
    public List<Booking> getOwnerBookings(@PathVariable String email) {
        return bookingService.getBookingsByOwner(email);
    }
    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
    @PutMapping("/{id}/status")
    public Booking updateBookingStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        return bookingService.updateBookingStatus(
                id,
                request.get("status")
        );

    }
}