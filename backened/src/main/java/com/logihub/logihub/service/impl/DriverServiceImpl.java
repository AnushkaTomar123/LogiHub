package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.DriverDTO;
import com.logihub.logihub.dto.DriverResponseDTO;
import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.enums.DriverStatus;

import com.logihub.logihub.repository.DriverRepository;
import com.logihub.logihub.repository.TransporterRepository;
import com.logihub.logihub.service.DriverService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DriverServiceImpl implements DriverService {

    @Autowired
    private DriverRepository driverRepository;

    @Autowired
    private TransporterRepository transporterRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Override
    public DriverResponseDTO addDriver(DriverDTO driverDTO) {
        Transporter transporter = transporterRepository.findById(driverDTO.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter not found with ID: " + driverDTO.getTransporterId()));

        // Map DTO -> Entity
        Driver driver = modelMapper.map(driverDTO, Driver.class);
        driver.setTransporter(transporter);
        driver.setId(null); // ensure new driver

        // Save and return DTO
        Driver saved = driverRepository.save(driver);
        DriverResponseDTO response = modelMapper.map(saved, DriverResponseDTO.class);
        response.setTransporterId(transporter.getId());
        return response;
    }

    @Override
    public List<DriverResponseDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(driver -> {
                    DriverResponseDTO dto = modelMapper.map(driver, DriverResponseDTO.class);
                    dto.setTransporterId(driver.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<DriverResponseDTO> getDriversByTransporter(Long transporterId) {
        return driverRepository.findByTransporterId(transporterId).stream()
                .map(driver -> {
                    DriverResponseDTO dto = modelMapper.map(driver, DriverResponseDTO.class);
                    dto.setTransporterId(driver.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public DriverResponseDTO updateDriver(Long id, DriverDTO driverDTO) {
        Driver existing = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + id));

        existing.setDriverName(driverDTO.getDriverName());
        existing.setLicenseNumber(driverDTO.getLicenseNumber());
        existing.setStatus(DriverStatus.valueOf(driverDTO.getStatus()));
        existing.setPhoneNumber(driverDTO.getPhoneNumber());

        Driver updated = driverRepository.save(existing);
        DriverResponseDTO response = modelMapper.map(updated, DriverResponseDTO.class);
        response.setTransporterId(updated.getTransporter().getId());
        return response;
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }

    @Override
    public List<DriverResponseDTO> getDriverByStatus(DriverStatus driverStatus) {
        List<Driver> drivers = driverRepository.findByStatus(driverStatus);

        // ✅ ModelMapper converts Driver → DriverResponseDTO automatically
        return drivers.stream()
                .map(driver -> modelMapper.map(driver, DriverResponseDTO.class))
                .toList();
    }
}
