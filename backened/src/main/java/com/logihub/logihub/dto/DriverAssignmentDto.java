package com.logihub.logihub.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DriverAssignmentDto {

    private Long bookingId;
    private Long transporterId;
    private Long driverId;
    private Long vehicleId;
    private LocalDateTime pickupDate;
}
