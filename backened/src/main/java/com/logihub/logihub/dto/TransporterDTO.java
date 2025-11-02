package com.logihub.logihub.dto;

import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransporterDTO {

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String userEmail;

    @NotBlank(message = "Company name is required")
    @Size(min = 2, max = 100, message = "Company name must be between 2 and 100 characters")
    private String companyName;

    @NotBlank(message = "Contact person name is required")
    @Size(min = 2, max = 50, message = "Contact person name must be between 2 and 50 characters")
    private String contactPersonName;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "^[6-9]\\d{9}$", message = "Invalid contact number (must be 10 digits starting with 6–9)")
    private String contactNumber;

    @NotBlank(message = "Address is required")
    @Size(min = 5, max = 255, message = "Address must be between 5 and 255 characters")
    private String address;

    @NotBlank(message = "PAN number is required")
    @Pattern(regexp = "[A-Z]{5}[0-9]{4}[A-Z]{1}", message = "Invalid PAN format (e.g., ABCDE1234F)")
    private String panNumber;

    @NotBlank(message = "Aadhaar number is required")
    @Pattern(regexp = "\\d{12}", message = "Aadhaar number must be 12 digits")
    private String aadhaarNumber;

    @NotNull(message = "Total vehicles count is required")
    @Min(value = 1, message = "There must be at least 1 vehicle")
    private Integer totalVehicles;

    @NotBlank(message = "Vehicle types field is required (e.g., Truck, Mini Truck, Tempo)")
    private String vehicleTypes;

    private MultipartFile profilePhoto;

    private MultipartFile rcProofDocument;
}
