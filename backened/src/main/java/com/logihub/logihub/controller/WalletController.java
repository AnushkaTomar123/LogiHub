package com.logihub.logihub.controller;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.Wallet;
import com.logihub.logihub.enums.TransactionType;
import com.logihub.logihub.service.WalletService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/create")
    public ResponseEntity<Wallet> createWallet(@Valid  @RequestBody WalletRequestDTO request) {
        return ResponseEntity.ok(walletService.createWallet(request));
    }

    @PostMapping("/add-money")
    public ResponseEntity<Wallet> addMoney(@Valid @RequestBody AddMoneyRequestDTO request) {
        return ResponseEntity.ok(walletService.addMoney(request));
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(@Valid @RequestBody TransferMoneyRequestDTO request) {
        return ResponseEntity.ok(walletService.transferMoney(request));
    }

    @GetMapping("/{ownerType}/{ownerId}")
    public ResponseEntity<Wallet> getWallet(@PathVariable String ownerType, @PathVariable Long ownerId) {
        return ResponseEntity.ok(walletService.getWallet(ownerId, ownerType));
    }

    @GetMapping("/transactions/{userId}")
    public ResponseEntity<List<WalletTransactionResponseDTO>> getTransactionHistory(@PathVariable Long userId) {
        return ResponseEntity.ok(walletService.getTransactionHistory(userId));
    }

    @GetMapping("/transaction-types")
    public ResponseEntity<List<String>> getTransactionTypes() {
        List<String> types = Arrays.stream(TransactionType.values())
                .map(Enum::name)
                .collect(Collectors.toList());
        return ResponseEntity.ok(types);
    }

    @GetMapping("/transactions/{walletId}/type/{type}")
    public ResponseEntity<List<WalletTransactionResponseDTO>> searchTransactionsByType(
            @PathVariable Long walletId,
            @PathVariable String type) {

        TransactionType transactionType = TransactionType.valueOf(type.toUpperCase());
        return ResponseEntity.ok(walletService.getTransactionsByType(walletId, transactionType));
    }


}
