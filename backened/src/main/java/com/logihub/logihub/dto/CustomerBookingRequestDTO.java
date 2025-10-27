package com.logihub.logihub.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerBookingRequestDTO {
    private Long customerId;
    private String pickupAddress;
    private String dropAddress;
    private LocalDateTime pickupDate;
    private LocalDateTime deliveryDate;
    private Double estimatedDistanceKm;
    private Double estimatedCost;
}
