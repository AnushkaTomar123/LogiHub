package com.logihub.logihub.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverResponseDTO {
    private Long id;
    private String driverName;
    private String licenseNumber;
    private String phoneNumber;
    private String  status ;
    private Long transporterId;
}
