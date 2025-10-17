package com.logihub.logihub.controller;

import com.logihub.logihub.service.impl.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        forgotPasswordService.createTokenAndSendEmailIfUserExists(email);
        return ResponseEntity.ok("If an account exists, a reset link has been sent.");
    }

    @GetMapping("/verify-token")
    public ResponseEntity<?> verifyToken(@RequestParam String token) {
        boolean valid = forgotPasswordService.isTokenValid(token);
        if(valid) return ResponseEntity.ok("Valid token");
        return ResponseEntity.badRequest().body("Invalid or expired token");
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam String token,
                                           @RequestParam String newPassword) {
        boolean ok = forgotPasswordService.resetPassword(token, newPassword);
        if(ok) return ResponseEntity.ok("Password reset successfully");
        return ResponseEntity.badRequest().body("Invalid or expired token");
    }
}
