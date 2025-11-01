package com.logihub.logihub.entity;

import com.logihub.logihub.enums.WalletOwnerType;
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

    @OneToOne
    @JoinColumn(name = "customer_id", referencedColumnName = "id")
    private Customer customer;

    @OneToOne
    @JoinColumn(name = "transporter_id", referencedColumnName = "id")
    private Transporter transporter;

    private LocalDateTime lastUpdated;
}
