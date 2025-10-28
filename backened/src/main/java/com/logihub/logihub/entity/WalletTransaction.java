package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallet_transactions")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class WalletTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long walletId;

    private Double amount;

    @Enumerated(EnumType.STRING)
    private TransactionType type; // CREDIT or DEBIT

    private String description;

    private LocalDateTime createdAt;
}
