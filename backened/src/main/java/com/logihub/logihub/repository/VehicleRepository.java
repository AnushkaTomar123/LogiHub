package com.logihub.logihub.repository;

import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.Vehicle;
import com.logihub.logihub.enums.VehicleStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    List<Vehicle> findByTransporterId(Long transporterId);
    List<Vehicle> findByTransporterIdAndStatus(Long transporterId, String status);

    List<Vehicle> findByStatus(VehicleStatus vehicleStatus);
}
