package com.logihub.logihub.dto;

import com.logihub.logihub.enums.PaymentStatus;
import lombok.*;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PaymentResponseDTO {
    private String transactionId;
    private Double amount;
    private PaymentStatus status;
    private String type;
    private LocalDateTime createdAt;
}
