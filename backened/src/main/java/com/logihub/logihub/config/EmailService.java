package com.logihub.logihub.config;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.extern.slf4j.Slf4j;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.frontend.base-url}")
    private String baseUrl;

    /**
     * Sends a password reset email with an embedded reset link.
     */
    public void sendPasswordResetEmail(String toEmail, String token) {
        String resetLink = baseUrl + "/api/auth/reset-password?token=" + token;

        String html = """
            <html>
            <body style="font-family: Arial, sans-serif; text-align: center; padding: 40px;">
                <h2 style="color: #2E86C1;">Password Reset Request</h2>
                <p>You requested to reset your password.</p>
                <p>Click the button below to reset it:</p>
                <p>
                    <a href="%s" style="background-color: #2E86C1; color: white; 
                       padding: 10px 20px; text-decoration: none; border-radius: 5px;">
                       Reset Password
                    </a>
                </p>
                <p>This link will expire in <b>30 minutes</b>.</p>
                <hr>
                <p style="font-size: 12px; color: gray;">
                    If you didn’t request this, you can safely ignore this email.
                </p>
            </body>
            </html>
            """.formatted(resetLink);

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo(toEmail);
            helper.setSubject("Password Reset Request");
            helper.setText(html, true); // true = HTML enabled
            mailSender.send(message);
            log.info("✅ Password reset email sent successfully to {}", toEmail);
        } catch (MessagingException e) {
            log.error("❌ Failed to send password reset email to {}", toEmail, e);
        }
    }
}
