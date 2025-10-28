//package com.logihub.logihub.controller;
//
//import com.logihub.logihub.entity.WalletTransaction;
//import com.logihub.logihub.repository.WalletTransactionRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/transactions")
//@RequiredArgsConstructor
//public class WalletTransactionController {
//
//    private final WalletTransactionRepository transactionRepository;
//
//    @GetMapping("/{walletId}")
//    public ResponseEntity<List<WalletTransaction>> getTransactions(@PathVariable Long walletId) {
//        return ResponseEntity.ok(transactionRepository.findByWalletIdOrderByCreatedAtDesc(walletId));
//    }
//}
