package com.logihub.logihub.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransporterDTO {

    private String userEmail;
    private String companyName;
    private String contactPersonName;
    private String contactNumber;
    private String address;
    private String panNumber;
    private String aadhaarNumber;
    private Integer totalVehicles;
    private String vehicleTypes;

    // Uploaded files (can be image/pdf)
    private MultipartFile profilePhoto;
    private MultipartFile rcProofDocument;
}
