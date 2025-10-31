package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.VehicleDTO;
import com.logihub.logihub.dto.VehicleResponseDTO;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.entity.Vehicle;
import com.logihub.logihub.enums.VehicalStatus;
import com.logihub.logihub.enums.VehicleModel;
import com.logihub.logihub.enums.VehicleType;
import com.logihub.logihub.repository.TransporterRepository;
import com.logihub.logihub.repository.VehicleRepository;
import com.logihub.logihub.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private TransporterRepository transporterRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public VehicleResponseDTO addVehicle(VehicleDTO vehicleDTO) {
        Transporter transporter = transporterRepository.findById(vehicleDTO.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter not found with ID: " + vehicleDTO.getTransporterId()));

        Vehicle vehicle = modelMapper.map(vehicleDTO, Vehicle.class);
        vehicle.setId(null);
        vehicle.setTransporter(transporter);

        Vehicle saved = vehicleRepository.save(vehicle);
        VehicleResponseDTO response = modelMapper.map(saved, VehicleResponseDTO.class);
        response.setTransporterId(transporter.getId());
        return response;
    }

    @Override
    public List<VehicleResponseDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(vehicle -> {
                    VehicleResponseDTO dto = modelMapper.map(vehicle, VehicleResponseDTO.class);
                    dto.setTransporterId(vehicle.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<VehicleResponseDTO> getVehiclesByTransporter(Long transporterId) {
        return vehicleRepository.findByTransporterId(transporterId)
                .stream()
                .map(vehicle -> {
                    VehicleResponseDTO dto = modelMapper.map(vehicle, VehicleResponseDTO.class);
                    dto.setTransporterId(vehicle.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public VehicleResponseDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + id));

        existing.setVehicleNumber(vehicleDTO.getVehicleNumber());
        existing.setVehicleType(VehicleType.valueOf(vehicleDTO.getVehicleType())); // String → Enum
        existing.setModel(VehicleModel.valueOf(vehicleDTO.getModel()));           // String → Enum
        existing.setStatus(VehicalStatus.valueOf(vehicleDTO.getStatus()));           // String → Enum
        existing.setCapacity(vehicleDTO.getCapacity());

        Vehicle updated = vehicleRepository.save(existing);

        VehicleResponseDTO response = modelMapper.map(updated, VehicleResponseDTO.class);
        response.setTransporterId(updated.getTransporter().getId());
        return response;
    }


    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
