package com.logihub.logihub.service.impl;

import com.logihub.logihub.config.EmailService;
import com.logihub.logihub.entity.PasswordResetToken;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.PasswordResetTokenRepository;
import com.logihub.logihub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private final long EXPIRATION_MINUTES = 30;

    /**
     * Step 1: Generate a token and send reset link if the user exists.
     */
    public void createTokenAndSendEmailIfUserExists(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            // Remove old tokens for safety
            tokenRepository.deleteByUserId(user.getId());

            String token = UUID.randomUUID().toString();
            PasswordResetToken resetToken = PasswordResetToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES))
                    .build();

            tokenRepository.save(resetToken);
            log.info("🪄 Password reset token generated for user: {}", user.getEmail());

            // Send HTML email with reset link
            emailService.sendPasswordResetEmail(user.getEmail(), token);
        });
    }

    /**
     * Step 2: Verify token and reset password.
     */
    public boolean resetPassword(String token, String newPassword) {
        return tokenRepository.findByToken(token)
                .filter(t -> t.getExpiryDate().isAfter(LocalDateTime.now()))
                .map(t -> {
                    User user = t.getUser();
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                    tokenRepository.deleteByUserId(user.getId());
                    log.info("✅ Password reset successful for user: {}", user.getEmail());
                    return true;
                })
                .orElse(false);
    }
}
