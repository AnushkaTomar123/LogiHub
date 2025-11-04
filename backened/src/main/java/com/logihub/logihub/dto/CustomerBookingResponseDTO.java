package com.logihub.logihub.dto;

import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.enums.PaymentStatus;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerBookingResponseDTO {
    private Long id;
    private Long customerId;
    private String pickupAddress;
    private String dropAddress;
    private LocalDateTime bookingDate;
    private LocalDateTime pickupDate;
    private LocalDateTime deliveryDate;
    private Double capacity;
    private BookingStatus status;
    private PaymentStatus paymentStatus;
    private Long transporterId;
    private Long vehicleId;
    private Long driverId;
    private Double estimatedDistanceKm;
    private Double estimatedCost;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDate expectDeliveryDate;
}
