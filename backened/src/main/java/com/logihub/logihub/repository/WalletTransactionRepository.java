package com.logihub.logihub.repository;

import com.logihub.logihub.entity.WalletTransaction;
import com.logihub.logihub.enums.TransactionType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Arrays;
import java.util.List;

public interface WalletTransactionRepository extends JpaRepository<WalletTransaction, Long> {
    List<WalletTransaction> findByWalletId(Long walletId);

    List<WalletTransaction> findByWalletIdAndTransactionType(Long walletId, TransactionType transactionType);
}
