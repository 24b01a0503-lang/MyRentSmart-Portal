package com.rentsmart.backend.repository;

import com.rentsmart.backend.entity.Property;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long> {

    List<Property> findByOwnerEmail(String ownerEmail);

    List<Property> findByLocation(String location);

}