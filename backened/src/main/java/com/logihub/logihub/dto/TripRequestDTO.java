package com.logihub.logihub.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripRequestDTO {
    private Long transporterId;
    private Long driverId;
    private String customerEmail;
    private String fromLocation;
    private String toLocation;
}
