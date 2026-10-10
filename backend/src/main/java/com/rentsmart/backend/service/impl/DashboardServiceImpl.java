package com.rentsmart.backend.service.impl;

import com.rentsmart.backend.dto.DashboardResponse;
import com.rentsmart.backend.repository.BookingRepository;
import com.rentsmart.backend.repository.PropertyRepository;
import com.rentsmart.backend.repository.UserRepository;
import com.rentsmart.backend.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PropertyRepository propertyRepository;

    @Autowired
    private BookingRepository bookingRepository;

    @Override
    public DashboardResponse getDashboardDetails() {

        long totalUsers = userRepository.count();

        long totalProperties = propertyRepository.count();

        long totalBookings = bookingRepository.count();

        return new DashboardResponse(
                totalUsers,
                totalProperties,
                totalBookings
        );
    }
}