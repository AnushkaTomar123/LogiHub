package com.logihub.logihub.dto;

import com.logihub.logihub.entity.PaymentType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestDTO {
    private Long bookingId;
    private Double amount;
    private String type;
}
