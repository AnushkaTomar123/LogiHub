package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.DriverDTO;
import com.logihub.logihub.entity.Driver;
import com.logihub.logihub.entity.Transporter;
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
    public DriverDTO addDriver(DriverDTO driverDTO) {
        Transporter transporter = transporterRepository.findById(driverDTO.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter not found with ID: " + driverDTO.getTransporterId()));

        Driver driver = modelMapper.map(driverDTO, Driver.class);
        driver.setTransporter(transporter);

        Driver saved = driverRepository.save(driver);
        return modelMapper.map(saved, DriverDTO.class);
    }

    @Override
    public List<DriverDTO> getAllDrivers() {
        return driverRepository.findAll().stream()
                .map(driver -> {
                    DriverDTO dto = modelMapper.map(driver, DriverDTO.class);
                    dto.setTransporterId(driver.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<DriverDTO> getDriversByTransporter(Long transporterId) {
        return driverRepository.findByTransporterId(transporterId).stream()
                .map(driver -> {
                    DriverDTO dto = modelMapper.map(driver, DriverDTO.class);
                    dto.setTransporterId(driver.getTransporter().getId());
                    return dto;
                })
                .collect(Collectors.toList());
    }

    @Override
    public DriverDTO updateDriver(Long id, DriverDTO driverDTO) {
        Driver existing = driverRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Driver not found with ID: " + id));

        existing.setDriverName(driverDTO.getDriverName());
        existing.setLicenseNumber(driverDTO.getLicenseNumber());
        existing.setPhoneNumber(driverDTO.getPhoneNumber());

        Driver updated = driverRepository.save(existing);
        return modelMapper.map(updated, DriverDTO.class);
    }

    @Override
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}
