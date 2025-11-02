package com.logihub.logihub.dto;

import jakarta.validation.constraints.Positive;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentRequestDTO {
    private Long bookingId;
    @Positive(message = "Estimated cost must be positive")
    private Double amount;
    private String type;
}
