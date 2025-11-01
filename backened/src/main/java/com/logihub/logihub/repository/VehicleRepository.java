package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByTransporterId(Long transporterId);
    List<Vehicle> findByTransporterIdAndStatus(Long transporterId, String status);
}
