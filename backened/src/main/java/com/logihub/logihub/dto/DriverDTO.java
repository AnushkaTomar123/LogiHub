package com.logihub.logihub.dto;


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
//    private MultipartFile profilePhoto;
    private Long transporterId;
}
