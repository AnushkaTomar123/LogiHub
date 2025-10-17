package com.logihub.logihub.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.base-url}")
    private String baseUrl;

    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = baseUrl + "/reset-password?token=" + token;

        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo(toEmail);
        msg.setSubject("Password Reset Request");
        msg.setText("You requested a password reset. Click below link:\n" + resetLink
                + "\n\nIf you didn't request this, ignore this email.");
        mailSender.send(msg);
    }
}
