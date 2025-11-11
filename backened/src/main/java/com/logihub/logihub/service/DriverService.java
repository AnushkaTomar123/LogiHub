package com.logihub.logihub.service;

import com.logihub.logihub.dto.DriverDTO;
import com.logihub.logihub.dto.DriverResponseDTO;
import com.logihub.logihub.enums.DriverStatus;

import java.util.List;

public interface DriverService {
    DriverResponseDTO addDriver(DriverDTO driverDTO);
    List<DriverResponseDTO> getAllDrivers();
    List<DriverResponseDTO> getDriversByTransporter(Long transporterId);
    DriverResponseDTO updateDriver(Long id, DriverDTO driverDTO);
    void deleteDriver(Long id);

    List<DriverResponseDTO> getDriverByStatus(DriverStatus driverStatus);
}
