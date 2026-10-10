package com.rentsmart.backend.service;

import com.rentsmart.backend.entity.Property;
import com.rentsmart.backend.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.*;
import java.util.List;
import java.util.UUID;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    private static final String UPLOAD_DIR =
            "C:/Users/bhavy/Downloads/backend/uploads/";

    public Property addProperty(
            String title,
            String location,
            double rent,
            String description,
            String ownerEmail,
            MultipartFile image
    ) {

        try {

            Path uploadPath = Paths.get(UPLOAD_DIR);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            String fileName = UUID.randomUUID() + "_" + image.getOriginalFilename();

            Path filePath = uploadPath.resolve(fileName);
            System.out.println("Upload Path: " + uploadPath.toAbsolutePath());
            System.out.println("File Path: " + filePath.toAbsolutePath());
            Files.copy(
                    image.getInputStream(),
                    filePath,
                    StandardCopyOption.REPLACE_EXISTING
            );

            System.out.println("Image saved to:");
            System.out.println(filePath.toAbsolutePath());

            Property property = new Property();
            property.setTitle(title);
            property.setLocation(location);
            property.setRent(rent);
            property.setDescription(description);
            property.setOwnerEmail(ownerEmail);
            property.setImageUrl(fileName);

            return propertyRepository.save(property);

        } catch (IOException e) {
            e.printStackTrace();
            throw new RuntimeException("Image upload failed");
        }
    }

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public List<Property> getPropertiesByOwner(String ownerEmail) {
        return propertyRepository.findByOwnerEmail(ownerEmail);
    }

    public Property updateProperty(Long id, Property updatedProperty) {

        Property property = propertyRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Property not found"));

        property.setTitle(updatedProperty.getTitle());
        property.setLocation(updatedProperty.getLocation());
        property.setRent(updatedProperty.getRent());
        property.setDescription(updatedProperty.getDescription());

        return propertyRepository.save(property);
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}