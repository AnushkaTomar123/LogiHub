package com.logihub.logihub.dto;


import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverDTO {
    private String driverName;
    private String licenseNumber;
    private String phoneNumber;
    private Long transporterId;
}
