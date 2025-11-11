package com.logihub.logihub.dto;

import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.Vehicle;
import lombok.*;

import java.util.List;

@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserProfileDTO {

    private Long userId;
    private String username;
    private String email;
    private String role;

    // Common fields
    private String contactNo;
    private String address;
    private String aadhar;
    private String profilePhotoUrl;

    // Transporter-specific
    private String companyName;
    private String contactPersonName;
    private String contactNumber;
    private String panNumber;
    private String aadhaarNumber;
    private Integer totalVehicles;
    private String vehicleTypes;
    private String rcProofDocumentUrl;
    private List<Driver> drivers;
    private List<Vehicle> vehicles;

    // Admin-specific
    private String adminCode;
}
