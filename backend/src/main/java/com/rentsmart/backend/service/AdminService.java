package com.rentsmart.backend.service;

import com.rentsmart.backend.entity.Booking;
import com.rentsmart.backend.entity.Property;
import com.rentsmart.backend.entity.User;
import com.rentsmart.backend.repository.BookingRepository;
import com.rentsmart.backend.repository.PropertyRepository;
import com.rentsmart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }
}