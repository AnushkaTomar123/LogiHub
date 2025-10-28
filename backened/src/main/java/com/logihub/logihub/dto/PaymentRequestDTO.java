package com.logihub.logihub.dto;

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
