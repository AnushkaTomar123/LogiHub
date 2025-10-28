package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.Wallet;
import com.logihub.logihub.entity.WalletTransaction;
import com.logihub.logihub.enums.TransactionType;
import com.logihub.logihub.enums.WalletOwnerType;
import com.logihub.logihub.repository.WalletRepository;
import com.logihub.logihub.repository.WalletTransactionRepository;
import com.logihub.logihub.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WalletServiceImpl implements WalletService {

    private final WalletRepository walletRepository;
    private final WalletTransactionRepository transactionRepository;

    @Override
    public Wallet createWallet(WalletRequestDTO request) {
        return walletRepository.findByOwnerIdAndOwnerType(request.getOwnerId(), request.getOwnerType())
                .orElseGet(() -> walletRepository.save(
                        Wallet.builder()
                                .ownerId(request.getOwnerId())
                                .ownerType(request.getOwnerType())
                                .balance(0.0)
                                .lastUpdated(LocalDateTime.now())
                                .build()
                ));
    }

    @Override
    @Transactional
    public Wallet addMoney(AddMoneyRequestDTO request) {
        if (request.getAmount() <= 0)
            throw new RuntimeException("Amount must be greater than zero");

        Wallet wallet = walletRepository.findByOwnerIdAndOwnerType(request.getOwnerId(), request.getOwnerType())
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        wallet.setBalance(wallet.getBalance() + request.getAmount());
        wallet.setLastUpdated(LocalDateTime.now());
        walletRepository.save(wallet);

        // Save transaction
        WalletTransaction tx = WalletTransaction.builder()
                .walletId(wallet.getId())
                .transactionType(TransactionType.ADD)
                .amount(request.getAmount())
                .description("Money added to wallet")
                .timestamp(LocalDateTime.now())
                .ownerType(request.getOwnerType())
                .build();
        transactionRepository.save(tx);

        return wallet;
    }

    @Override
    @Transactional
    public String transferMoney(TransferMoneyRequestDTO request) {
        if (request.getAmount() <= 0)
            throw new RuntimeException("Amount must be greater than zero");

        Wallet sender = walletRepository.findByOwnerIdAndOwnerType(request.getSenderId(), request.getSenderType())
                .orElseThrow(() -> new RuntimeException("Sender wallet not found"));

        Wallet receiver = walletRepository.findByOwnerIdAndOwnerType(request.getReceiverId(), request.getReceiverType())
                .orElseThrow(() -> new RuntimeException("Receiver wallet not found"));

        if (sender.getBalance() < request.getAmount())
            throw new RuntimeException("Insufficient balance");

        // Update balances
        sender.setBalance(sender.getBalance() - request.getAmount());
        receiver.setBalance(receiver.getBalance() + request.getAmount());
        sender.setLastUpdated(LocalDateTime.now());
        receiver.setLastUpdated(LocalDateTime.now());
        walletRepository.save(sender);
        walletRepository.save(receiver);

        // Record transactions
        transactionRepository.save(WalletTransaction.builder()
                .walletId(sender.getId())
                .transactionType(TransactionType.TRANSFER)
                .amount(-request.getAmount())
                .description("Transfer to wallet " + receiver.getId())
                .timestamp(LocalDateTime.now())
                .relatedWalletId(receiver.getId())
                .ownerType(request.getSenderType())
                .build());

        transactionRepository.save(WalletTransaction.builder()
                .walletId(receiver.getId())
                .transactionType(TransactionType.TRANSFER)
                .amount(request.getAmount())
                .description("Received from wallet " + sender.getId())
                .timestamp(LocalDateTime.now())
                .relatedWalletId(sender.getId())
                .ownerType(request.getReceiverType())
                .build());

        return "Transferred ₹" + request.getAmount() + " from wallet " + sender.getId() + " to wallet " + receiver.getId();
    }

    @Override
    public Wallet getWallet(Long ownerId, String ownerType) {
        WalletOwnerType type = WalletOwnerType.valueOf(ownerType.toUpperCase());
        return walletRepository.findByOwnerIdAndOwnerType(ownerId, type)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
    }

    @Override
    public List<WalletTransactionResponseDTO> getTransactionHistory(Long ownerId, String ownerType) {
        WalletOwnerType type = WalletOwnerType.valueOf(ownerType.toUpperCase());
        Wallet wallet = walletRepository.findByOwnerIdAndOwnerType(ownerId, type)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));

        return transactionRepository.findByWalletId(wallet.getId()).stream()
                .map(tx -> WalletTransactionResponseDTO.builder()
                        .id(tx.getId())
                        .transactionType(tx.getTransactionType())
                        .amount(tx.getAmount())
                        .description(tx.getDescription())
                        .timestamp(tx.getTimestamp())
                        .build())
                .collect(Collectors.toList());
    }
}
