package com.logihub.logihub.dto;

import com.logihub.logihub.enums.WalletOwnerType;
import lombok.Data;

@Data
public class TransferMoneyRequestDTO {
    private Long senderId;
    private WalletOwnerType senderType;
    private Long receiverId;
    private WalletOwnerType receiverType;
    private double amount;
}
