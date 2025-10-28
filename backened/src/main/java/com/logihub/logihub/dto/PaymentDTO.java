package com.logihub.logihub.dto;

import com.logihub.logihub.entity.PaymentStatus;
import com.logihub.logihub.entity.PaymentType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentDTO {
    private Double amount;
    private PaymentType type;
    private Long customerId;
    private Long transporterId;
    private Long bookingId;
    private PaymentStatus status;
}
