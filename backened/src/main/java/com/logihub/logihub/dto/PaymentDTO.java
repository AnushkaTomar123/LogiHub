package com.logihub.logihub.dto;

import com.logihub.logihub.enums.PaymentStatus;
import com.logihub.logihub.enums.PaymentType;
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
