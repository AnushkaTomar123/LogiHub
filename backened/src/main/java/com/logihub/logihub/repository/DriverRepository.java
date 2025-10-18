package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.PasswordResetToken;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DriverRepository extends JpaRepository<Driver,Long> {
    List<Driver> findByTransporterId(Long transporterId);

}
