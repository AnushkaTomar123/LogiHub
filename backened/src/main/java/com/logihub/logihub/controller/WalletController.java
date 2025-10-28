package com.logihub.logihub.controller;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.Wallet;
import com.logihub.logihub.service.WalletService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletService walletService;

    @PostMapping("/create")
    public ResponseEntity<Wallet> createWallet(@RequestBody WalletRequestDTO request) {
        return ResponseEntity.ok(walletService.createWallet(request));
    }

    @PostMapping("/add-money")
    public ResponseEntity<Wallet> addMoney(@RequestBody AddMoneyRequestDTO request) {
        return ResponseEntity.ok(walletService.addMoney(request));
    }

    @PostMapping("/transfer")
    public ResponseEntity<String> transferMoney(@RequestBody TransferMoneyRequestDTO request) {
        return ResponseEntity.ok(walletService.transferMoney(request));
    }

    @GetMapping("/{ownerType}/{ownerId}")
    public ResponseEntity<Wallet> getWallet(@PathVariable String ownerType, @PathVariable Long ownerId) {
        return ResponseEntity.ok(walletService.getWallet(ownerId, ownerType));
    }

    @GetMapping("/transactions/{ownerType}/{ownerId}")
    public ResponseEntity<List<WalletTransactionResponseDTO>> getTransactionHistory(@PathVariable String ownerType,
                                                                                    @PathVariable Long ownerId) {
        return ResponseEntity.ok(walletService.getTransactionHistory(ownerId, ownerType));
    }
}
