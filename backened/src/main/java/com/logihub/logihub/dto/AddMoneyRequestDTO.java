package com.logihub.logihub.dto;

import com.logihub.logihub.enums.WalletOwnerType;
import lombok.Data;

@Data
public class AddMoneyRequestDTO {
    private Long ownerId;
    private WalletOwnerType ownerType;
    private double amount;
}
