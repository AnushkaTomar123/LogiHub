package com.logihub.logihub.service;

import com.logihub.logihub.dto.VehicleDTO;
import java.util.List;

public interface VehicleService {
    VehicleDTO addVehicle(VehicleDTO vehicleDTO);
    List<VehicleDTO> getAllVehicles();
    List<VehicleDTO> getVehiclesByTransporter(Long transporterId);
    VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO);
    void deleteVehicle(Long id);
}
