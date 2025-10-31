package com.logihub.logihub.repository;

import com.logihub.logihub.entity.PasswordResetToken;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {
    Optional<PasswordResetToken> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUserId(Long userId);
//    @Transactional
//    @Modifying
//    @Query("DELETE FROM PasswordResetToken t WHERE t.email = :email")
//    void deleteByEmail(String email);
}
