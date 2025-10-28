package com.logihub.logihub.repository;

import com.logihub.logihub.entity.*;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    Optional<Wallet> findByOwnerIdAndOwnerType(Long ownerId, WalletOwnerType ownerType);
}
