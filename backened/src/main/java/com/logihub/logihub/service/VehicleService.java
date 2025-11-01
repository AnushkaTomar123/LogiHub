package com.logihub.logihub.service;

import com.logihub.logihub.dto.VehicleDTO;
import com.logihub.logihub.dto.VehicleResponseDTO;

import java.util.List;

public interface VehicleService {
    VehicleResponseDTO addVehicle(VehicleDTO vehicleDTO);
    List<VehicleResponseDTO> getAllVehicles();
    List<VehicleResponseDTO> getVehiclesByTransporter(Long transporterId);
    VehicleResponseDTO updateVehicle(Long id, VehicleDTO vehicleDTO);
    void deleteVehicle(Long id);
    List<VehicleResponseDTO> getVehiclesByTransporterAndStatus(Long transporterId, String status);
}


