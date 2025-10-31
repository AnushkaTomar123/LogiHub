package com.logihub.logihub.dto;


import com.logihub.logihub.enums.DriverStatus;
import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private String driverName;
    private String licenseNumber;
    private String phoneNumber;
    private String status;
//    private MultipartFile profilePhoto;
    private Long transporterId;
}
