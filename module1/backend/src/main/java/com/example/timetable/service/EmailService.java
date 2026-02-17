package com.example.timetable.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired(required = false)
    private JavaMailSender mailSender;

    @org.springframework.beans.factory.annotation.Value("${spring.mail.username:your-email@gmail.com}")
    private String fromEmail;

    public void sendEmail(String to, String subject, String body) {
        if (mailSender == null) {
            System.out.println("⚠ MailSender not configured. Email to " + to + " suppressed.");
            System.out.println("Subject: " + subject);
            System.out.println("Body: " + body);
            return;
        }

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(fromEmail); 
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);

        try {
            mailSender.send(message);
            System.out.println("✓ Password reset email sent to: " + to);
        } catch (Exception e) {
            System.err.println("⚠ Failed to send real email: " + e.getMessage());
            System.out.println("\n--- DEVELOPMENT MODE: Reset Link Found Below ---");
            System.out.println("Subject: " + subject);
            System.out.println("Body: " + body);
            System.out.println("-----------------------------------------------\n");
        }
    }

    public void sendPasswordResetEmail(String email, String otp) {
        String subject = "Password Reset OTP - AEMS";
        String body = "You requested a password reset. Your 6-digit OTP is:\n\n" +
                     otp + "\n\n" +
                     "This OTP will expire in 10 minutes.";
        sendEmail(email, subject, body);
    }
}
