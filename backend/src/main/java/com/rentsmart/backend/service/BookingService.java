package com.rentsmart.backend.service;

import com.rentsmart.backend.entity.Booking;
import com.rentsmart.backend.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking bookProperty(Booking booking) {

        // Check if the same tenant has already booked this property
        boolean alreadyBookedByTenant = bookingRepository
                .existsByPropertyIdAndTenantEmail(
                        booking.getPropertyId(),
                        booking.getTenantEmail()
                );

        if (alreadyBookedByTenant) {
            throw new RuntimeException("You have already booked this property.");
        }

        // Check if the property has already been booked (accepted) by anyone
        boolean propertyAlreadyBooked = bookingRepository
                .existsByPropertyIdAndStatus(
                        booking.getPropertyId(),
                        "BOOKED"
                );

        if (propertyAlreadyBooked) {
            throw new RuntimeException("This property is already booked.");
        }

        booking.setStatus("PENDING");

        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByTenant(String tenantEmail) {
        return bookingRepository.findByTenantEmail(tenantEmail);
    }

    public List<Booking> getBookingsByOwner(String ownerEmail) {
        return bookingRepository.findByOwnerEmail(ownerEmail);
    }
    public Booking updateBookingStatus(Long id, String status) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);

        return bookingRepository.save(booking);
    }
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}