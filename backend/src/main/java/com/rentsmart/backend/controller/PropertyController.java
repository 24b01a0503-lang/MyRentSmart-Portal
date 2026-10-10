package com.rentsmart.backend.controller;

import com.rentsmart.backend.entity.Property;
import com.rentsmart.backend.service.PropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/properties")
@CrossOrigin(origins = "*")
public class PropertyController {

    @Autowired
    private PropertyService propertyService;

    @PostMapping(consumes = {"multipart/form-data"})
    public Property addProperty(

            @RequestParam("title") String title,
            @RequestParam("location") String location,
            @RequestParam("rent") double rent,
            @RequestParam("description") String description,
            @RequestParam("ownerEmail") String ownerEmail,
            @RequestParam("image") MultipartFile image

    ) {

        return propertyService.addProperty(
                title,
                location,
                rent,
                description,
                ownerEmail,
                image
        );

    }

    @GetMapping
    public List<Property> getAllProperties() {
        return propertyService.getAllProperties();
    }

    @GetMapping("/owner/{email}")
    public List<Property> getOwnerProperties(@PathVariable String email) {
        return propertyService.getPropertiesByOwner(email);
    }

    @PutMapping("/{id}")
    public Property updateProperty(@PathVariable Long id,
                                   @RequestBody Property property) {
        return propertyService.updateProperty(id, property);
    }

    @DeleteMapping("/{id}")
    public String deleteProperty(@PathVariable Long id) {
        propertyService.deleteProperty(id);
        return "Property deleted successfully";
    }
}