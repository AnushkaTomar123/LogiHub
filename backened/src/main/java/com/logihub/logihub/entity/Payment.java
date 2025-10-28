package com.logihub.logihub.entity;

import com.logihub.logihub.enums.PaymentStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String transactionId;
    private Double amount;

    @Enumerated(EnumType.STRING)
    private PaymentStatus status;

    private String type;

    private Long customerId;
    private Long transporterId;
    private Long bookingId;

    private LocalDateTime createdAt;
}
