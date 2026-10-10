package com.rentsmart.backend.repository;

import com.rentsmart.backend.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByTenantEmail(String tenantEmail);

    List<Booking> findByOwnerEmail(String ownerEmail);

    // Prevent same tenant booking the same property twice
    boolean existsByPropertyIdAndTenantEmail(Long propertyId, String tenantEmail);

    // Check if the property is already booked by anyone
    boolean existsByPropertyIdAndStatus(Long propertyId, String status);

}