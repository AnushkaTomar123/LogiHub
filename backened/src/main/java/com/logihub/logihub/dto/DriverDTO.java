package com.logihub.logihub.dto;


import com.logihub.logihub.enums.DriverStatus;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    @NotBlank(message = "Driver name is required")
    @Size(min = 2, max = 50, message = "Driver name must be between 2 and 50 characters")
    private String driverName;
    @NotBlank(message = "License number is required")
    @Pattern(
            regexp = "^[A-Z0-9-]{5,20}$",
            message = "License number must be alphanumeric (5–20 characters)"
    )
    private String licenseNumber;
    @NotBlank(message = "Phone number is required")
    @Pattern(
            regexp = "^[6-9]\\d{9}$",
            message = "Enter a valid 10-digit phone number starting with 6–9"
    )
    private String phoneNumber;
    private String status;
//    private MultipartFile profilePhoto;

    @NotNull(message = "Transporter ID is required")
    private Long transporterId;
}
