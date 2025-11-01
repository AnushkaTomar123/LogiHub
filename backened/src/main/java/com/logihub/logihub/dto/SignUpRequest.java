package com.logihub.logihub.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class SignUpRequest {
    @NotBlank(message = "Full name is required")
    private String username;
    @NotBlank(message = "Email is required")
    @Email(message = "Enter a valid email address")
    private String email;
    @NotBlank(message = "Password is required")
    @Size(min = 6, max = 20, message = "Password must be between 6 and 20 characters")
    private String password;
    private String role;
}
