package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "wallets")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Wallet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double balance;

    @Enumerated(EnumType.STRING)
    private WalletOwnerType ownerType; // CUSTOMER or TRANSPORTER

    private Long ownerId; // customerId or transporterId

    private LocalDateTime lastUpdated;
}
