package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.VehicleDTO;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.entity.Vehicle;
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
    public VehicleDTO addVehicle(VehicleDTO vehicleDTO) {
        Transporter transporter = transporterRepository.findById(vehicleDTO.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter not found with ID: " + vehicleDTO.getTransporterId()));

        Vehicle vehicle = modelMapper.map(vehicleDTO, Vehicle.class);
        vehicle.setTransporter(transporter);

        Vehicle saved = vehicleRepository.save(vehicle);
        return modelMapper.map(saved, VehicleDTO.class);
    }

    @Override
    public List<VehicleDTO> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .map(vehicle -> {
                    VehicleDTO dto = modelMapper.map(vehicle, VehicleDTO.class);
                    dto.setTransporterId(vehicle.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<VehicleDTO> getVehiclesByTransporter(Long transporterId) {
        return vehicleRepository.findByTransporterId(transporterId)
                .stream()
                .map(vehicle -> {
                    VehicleDTO dto = modelMapper.map(vehicle, VehicleDTO.class);
                    dto.setTransporterId(vehicle.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public VehicleDTO updateVehicle(Long id, VehicleDTO vehicleDTO) {
        Vehicle existing = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found with ID: " + id));

        existing.setVehicleNumber(vehicleDTO.getVehicleNumber());
        existing.setVehicleType(vehicleDTO.getVehicleType());
        existing.setModel(vehicleDTO.getModel());

        Vehicle updated = vehicleRepository.save(existing);
        return modelMapper.map(updated, VehicleDTO.class);
    }

    @Override
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}
