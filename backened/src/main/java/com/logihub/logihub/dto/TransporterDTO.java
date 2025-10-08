package com.logihub.logihub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TransporterDTO {

    private String userEmail;      // fetch User automatically
    private String companyName;
    private String vehicleNo;
    private String licenseNo;
    private String aadhaarNo;
}