package com.logihub.logihub.dto;


import com.logihub.logihub.enums.VehicalStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class VehicleResponseDTO {

    private Long id;
    private String vehicleNumber;
    private String vehicleType;
    private String model;
    private Double capacity;
    private String status;
    private Long transporterId;

}
