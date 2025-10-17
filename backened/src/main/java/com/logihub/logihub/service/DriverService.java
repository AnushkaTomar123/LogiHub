package com.logihub.logihub.service;

import com.logihub.logihub.dto.DriverDTO;

import java.util.List;

public interface DriverService {
    DriverDTO addDriver(DriverDTO driverDTO);
    List<DriverDTO> getAllDrivers();
    List<DriverDTO> getDriversByTransporter(Long transporterId);
    DriverDTO updateDriver(Long id, DriverDTO driverDTO);
    void deleteDriver(Long id);
}
