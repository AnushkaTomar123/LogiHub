package com.logihub.logihub.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CustomerDTO {


    @NotBlank(message = "Email is required")
    @Email(message = "Please enter a valid email address")
    private String userEmail;
//    @NotBlank(message = "Phone number is required")
//    @Pattern(
//            regexp = "^[6-9]\\d{9}$",
//            message = "Enter a valid 10-digit phone number starting with 6–9"
//    )
    private String contactNo;
    private String address;
    private String aadhar;
    private MultipartFile profilePhoto;
}
