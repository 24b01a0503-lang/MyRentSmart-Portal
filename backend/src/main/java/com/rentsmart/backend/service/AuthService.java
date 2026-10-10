package com.rentsmart.backend.service;

import com.rentsmart.backend.entity.User;
import com.rentsmart.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid Password");
        }

        return user;
    }
}