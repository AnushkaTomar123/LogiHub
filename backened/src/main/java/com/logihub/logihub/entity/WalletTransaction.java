package com.logihub.logihub.entity;

import com.logihub.logihub.enums.TransactionType;
import com.logihub.logihub.enums.WalletOwnerType;
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

    @Enumerated(EnumType.STRING)
    private TransactionType transactionType; // ADD / TRANSFER

    private Double amount;

    private String description;

    private LocalDateTime timestamp;

    private Long relatedWalletId; // For transfer tracking

    @Enumerated(EnumType.STRING)
    private WalletOwnerType ownerType;
}
