package com.logihub.logihub.dto;

import com.logihub.logihub.enums.VehicalStatus;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class VehicleDTO {
    private String vehicleNumber;
    private String vehicleType;
    private String model;
    private Double capacity;
    private String status;
    private Long transporterId;
}
