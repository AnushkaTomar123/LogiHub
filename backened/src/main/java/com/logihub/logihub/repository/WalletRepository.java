package com.logihub.logihub.repository;

import com.logihub.logihub.entity.*;
import com.logihub.logihub.enums.WalletOwnerType;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface WalletRepository extends JpaRepository<Wallet, Long> {
    //Optional<Wallet> findByOwnerIdAndOwnerType(Long ownerId, WalletOwnerType ownerType);
    Optional<Wallet> findByCustomer_Id(Long customerId);
    Optional<Wallet> findByTransporter_Id(Long transporterId);
}
