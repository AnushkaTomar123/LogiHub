package com.logihub.logihub.dto;

import com.logihub.logihub.enums.TransactionType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WalletTransactionResponseDTO {
    private Long id;
    private TransactionType transactionType;
    private Double amount;
    private String description;
    private LocalDateTime timestamp;
}
