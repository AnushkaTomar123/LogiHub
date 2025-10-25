package com.logihub.logihub.dto;

import com.logihub.logihub.entity.Trip;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TripResponseDTO {
    private Long tripId;
    private String transporterName;
    private String driverName;
    private String customerEmail;
    private String fromLocation;
    private String toLocation;
    private double distance;
    private Trip.Status status;
}
