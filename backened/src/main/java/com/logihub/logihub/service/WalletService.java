package com.logihub.logihub.service;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.Wallet;

import java.util.List;

public interface WalletService {
    Wallet createWallet(WalletRequestDTO request);
    Wallet addMoney(AddMoneyRequestDTO request);
    String transferMoney(TransferMoneyRequestDTO request);
    Wallet getWallet(Long ownerId, String ownerType);
    List<WalletTransactionResponseDTO> getTransactionHistory(Long ownerId, String ownerType);
}
