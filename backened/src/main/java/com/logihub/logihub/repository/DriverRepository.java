package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface DriverRepository extends JpaRepository<Driver,Long> {
    List<Vehicle> findByTransporterId(Long transporterId);
}
