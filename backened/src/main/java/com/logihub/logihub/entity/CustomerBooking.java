package com.logihub.logihub.entity;

import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.enums.PaymentStatus;
import com.logihub.logihub.enums.VehicalType;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "customer_booking")
public class CustomerBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Customer who requested the booking
    private Long customerId;

    // Pickup & Drop locations
    private String pickupAddress;
    private String dropAddress;
    private LocalDate ExpectDeliveryDate;
    private LocalDate bookingDate;   // Request time
    private LocalDate pickupDate;    // Scheduled pickup
    private LocalDate deliveryDate;  // Expected delivery
    private Double halfAmount;
    private Double remainingAmount;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;        // Initially REQUESTED

    @Enumerated(EnumType.STRING)
    private PaymentStatus paymentStatus; // Initially PENDING

    // Assigned after transporter accepts
    private Long transporterId;
    private Long vehicleId;
    private Long driverId;
    private Double capacity;
    private Double estimatedDistanceKm;
    private Double estimatedCost;
    private String goodsDescription;  // kya saman hai
    private VehicalType vehicleType;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Double proposedCost;     // last proposed price
    private Double finalCost;        // locked price
    private Long lastProposedBy;     // id of who proposed last
    private Boolean isCustomerProposed; // true if last proposer was customer
}
