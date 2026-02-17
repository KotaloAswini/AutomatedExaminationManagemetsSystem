package com.example.timetable.controller;

import com.example.timetable.model.User;
import com.example.timetable.repository.UserRepository;
import com.example.timetable.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            return ResponseEntity.status(400).body(Map.of("error", "Email already registered"));
        }
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.status(400).body(Map.of("error", "Username already taken"));
        }

        // Hash the password
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "User registered successfully"));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        System.out.println("Module 1: Password reset request for: " + email);

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            System.out.println("Module 1: User found. Generating OTP.");
            User user = userOpt.get();
            // Generate 6-digit OTP
            String otp = String.format("%06d", new java.util.Random().nextInt(999999));
            user.setResetToken(otp);
            user.setTokenExpiry(LocalDateTime.now().plusMinutes(10));
            userRepository.save(user);

            emailService.sendPasswordResetEmail(email, otp);
        } else {
            System.out.println("Module 1: User NOT found in database.");
        }

        // Always return success to prevent email enumeration
        return ResponseEntity.ok(Map.of("message", "If an account exists, a reset link has been sent."));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String token = request.get("token");
        if (token != null) {
            token = token.replaceAll("\\s+", ""); // Strip any spaces from OTP
        }
        String newPassword = request.get("newPassword");

        System.out.println("Module 1: Attempting password reset for: " + email + " with token: [" + token + "]");

        Optional<User> userOpt = userRepository.findByEmail(email);

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("Module 1: User found in DB. Stored token: [" + user.getResetToken() + "]");

            if (user.getResetToken() != null && user.getResetToken().equals(token)) {
                if (user.getTokenExpiry().isAfter(LocalDateTime.now())) {
                    // Hash new password
                    user.setPassword(passwordEncoder.encode(newPassword));
                    user.setResetToken(null);
                    user.setTokenExpiry(null);
                    userRepository.save(user);
                    System.out.println("✓ Module 1: Password reset successful for: " + email);
                    return ResponseEntity.ok(Map.of("message", "Password reset successful."));
                } else {
                    System.out.println("⚠ Module 1: Token has expired.");
                    return ResponseEntity.status(400)
                            .body(Map.of("error", "The code has expired. Please request a new one."));
                }
            } else {
                System.out.println("⚠ Module 1: Token mismatch. Provided: [" + token + "], Stored: ["
                        + user.getResetToken() + "]");
                return ResponseEntity.status(400).body(Map.of("error", "Invalid verification code."));
            }
        } else {
            System.out.println("⚠ Module 1: No user found with email: " + email);
            return ResponseEntity.status(400).body(Map.of("error", "No user found with this email."));
        }
    }

    @PutMapping("/profile/update")
    public ResponseEntity<?> updateProfile(@RequestBody User updatedUser) {
        System.out.println("Module 1: Received profile update request for user ID: " + updatedUser.getId());

        if (updatedUser.getId() == null) {
            System.err.println("Module 1 ERROR: Received null ID in update request");
            return ResponseEntity.status(400).body(Map.of("error", "User ID is missing"));
        }

        Optional<User> userOpt = userRepository.findById(updatedUser.getId());
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            System.out.println("Module 1: Found user: " + user.getEmail());

            // Update allowed fields
            user.setName(updatedUser.getName());
            user.setDesignation(updatedUser.getDesignation());
            user.setDepartment(updatedUser.getDepartment());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            user.setUsername(updatedUser.getUsername());
            user.setProfilePicture(updatedUser.getProfilePicture());
            if (updatedUser.getEmail() != null && !updatedUser.getEmail().isEmpty()) {
                user.setEmail(updatedUser.getEmail());
            }
            user.setBio(updatedUser.getBio());
            user.setCoverPhoto(updatedUser.getCoverPhoto());

            userRepository.save(user);
            System.out.println("✓ Module 1: Profile updated successfully for: " + user.getEmail());
            return ResponseEntity.ok(user);
        } else {
            System.err.println("⚠ Module 1 ERROR: User NOT found for ID: " + updatedUser.getId());
            return ResponseEntity.status(404).body(Map.of("error", "User not found in database"));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String username = request.get("username");
        String password = request.get("password");

        Optional<User> userOpt = userRepository.findByUsernameOrEmail(username, username);
        if (userOpt.isPresent() && passwordEncoder.matches(password, userOpt.get().getPassword())) {
            return ResponseEntity.ok(userOpt.get());
        }

        return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
    }
}
