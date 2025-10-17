package com.logihub.logihub.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDTO {
    private String vehicleNumber;
    private String vehicleType;
    private String model;
    private Long transporterId;
}
