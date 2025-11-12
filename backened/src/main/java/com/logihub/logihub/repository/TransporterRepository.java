package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Transporter;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TransporterRepository extends JpaRepository<Transporter, Long> {
    Optional<Transporter> findByUserEmail(String email);
    Optional<Transporter> findByUserId(Long userId);
    List<Transporter> findByCompanyNameContainingIgnoreCase(String companyName);
}
