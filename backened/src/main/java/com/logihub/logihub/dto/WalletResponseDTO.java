package com.logihub.logihub.dto;

import com.logihub.logihub.enums.WalletOwnerType;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class WalletResponseDTO {
    private Long id;
    private Long ownerId;
    private WalletOwnerType ownerType;
    private Double balance;
    private LocalDateTime lastUpdated;
}
