package com.logihub.logihub.controller;

import com.logihub.logihub.entity.*;
import com.logihub.logihub.repository.WalletRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/api/wallets")
@RequiredArgsConstructor
public class WalletController {

    private final WalletRepository walletRepository;

    @PostMapping("/create")
    public ResponseEntity<Wallet> createWallet(@RequestParam Long ownerId,
                                               @RequestParam WalletOwnerType ownerType) {
        Wallet wallet = Wallet.builder()
                .ownerId(ownerId)
                .ownerType(ownerType)
                .balance(10000.0)
                .lastUpdated(LocalDateTime.now())
                .build();

        return ResponseEntity.ok(walletRepository.save(wallet));
    }

    @GetMapping("/{ownerType}/{ownerId}")
    public ResponseEntity<Wallet> getWallet(@PathVariable WalletOwnerType ownerType, @PathVariable Long ownerId) {
        Wallet wallet = walletRepository.findByOwnerIdAndOwnerType(ownerId, ownerType)
                .orElseThrow(() -> new RuntimeException("Wallet not found"));
        return ResponseEntity.ok(wallet);
    }
}
