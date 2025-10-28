package com.logihub.logihub.dto;

import com.logihub.logihub.entity.PaymentStatus;
import com.logihub.logihub.entity.PaymentType;
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
