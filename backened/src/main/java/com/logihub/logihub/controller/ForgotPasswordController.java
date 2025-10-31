package com.logihub.logihub.controller;

import com.logihub.logihub.service.impl.ForgotPasswordService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class ForgotPasswordController {

    private final ForgotPasswordService forgotPasswordService;

    // Step 1: Trigger email
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestParam String email) {
        forgotPasswordService.createTokenAndSendEmailIfUserExists(email);
        return ResponseEntity.ok("If an account exists, a reset link with form has been sent.");
    }

    // Step 2: Serve reset form directly (HTML)
    @GetMapping(value = "/reset-password", produces = MediaType.TEXT_HTML_VALUE)
    public String showResetForm(@RequestParam String token) {
        return String.format("""
            <html>
            <head><title>Reset Password</title></head>
            <body style='font-family: Arial; text-align:center; padding:40px;'>
                <h2>Reset Your Password</h2>
                <form method="POST" action="/api/auth/reset-password-submit">
                    <input type="hidden" name="token" value="%s"/>
                    <label>New Password:</label><br/>
                    <input type="password" name="newPassword" required style='padding:5px; margin:8px;'/><br/>
                    <button type="submit" style='padding:8px 16px;'>Reset Password</button>
                </form>
            </body>
            </html>
            """, token);
    }

    // Step 3: Handle form submission
    @PostMapping(value = "/reset-password-submit", consumes = MediaType.APPLICATION_FORM_URLENCODED_VALUE)
    public ResponseEntity<String> handleResetSubmit(@RequestParam String token,
                                                    @RequestParam String newPassword) {
        boolean ok = forgotPasswordService.resetPassword(token, newPassword);
        if (ok) {
            return ResponseEntity.ok("""
                    <html><body style='font-family: Arial; text-align:center; padding:40px;'>
                    <h2>Password Reset Successful!</h2>
                    <p>You can now log in with your new password.</p>
                    </body></html>
                    """);
        } else {
            return ResponseEntity.badRequest().body("""
                    <html><body style='font-family: Arial; text-align:center; padding:40px;'>
                    <h2>Invalid or Expired Token</h2>
                    <p>Please request a new password reset.</p>
                    </body></html>
                    """);
        }
    }
}
