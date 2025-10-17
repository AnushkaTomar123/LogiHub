package com.logihub.logihub.service.impl;

import com.logihub.logihub.config.EmailService;
import com.logihub.logihub.entity.PasswordResetToken;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.PasswordResetTokenRepository;
import com.logihub.logihub.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ForgotPasswordService {

    private final UserRepository userRepository;
    private final PasswordResetTokenRepository tokenRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;

    private final long EXPIRATION_MINUTES = 30;

    // Step 1: Create token & send email
    public void createTokenAndSendEmailIfUserExists(String email) {
        userRepository.findByEmail(email).ifPresent(user -> {
            String token = UUID.randomUUID().toString();
            PasswordResetToken prt = PasswordResetToken.builder()
                    .token(token)
                    .user(user)
                    .expiryDate(LocalDateTime.now().plusMinutes(EXPIRATION_MINUTES))
                    .build();
            tokenRepository.save(prt);

            emailService.sendPasswordResetEmail(user.getEmail(), token);
        });
    }

    // Step 2: Verify token
    public boolean isTokenValid(String token) {
        return tokenRepository.findByToken(token)
                .filter(t -> t.getExpiryDate().isAfter(LocalDateTime.now()))
                .isPresent();
    }

    // Step 3: Reset password
    public boolean resetPassword(String token, String newPassword) {
        return tokenRepository.findByToken(token)
                .filter(t -> t.getExpiryDate().isAfter(LocalDateTime.now()))
                .map(t -> {
                    User user = t.getUser();
                    user.setPassword(passwordEncoder.encode(newPassword));
                    userRepository.save(user);
                    tokenRepository.deleteByToken(token);
                    return true;
                }).orElse(false);
    }
}
