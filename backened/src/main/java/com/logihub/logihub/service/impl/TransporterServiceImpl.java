package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.TransporterDTO;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.TransporterRepository;
import com.logihub.logihub.repository.UserRepository;
import com.logihub.logihub.service.TransporterService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransporterServiceImpl implements TransporterService {

    private final TransporterRepository transporterRepository;
    private final UserRepository userRepository;

    @Override
    public void createTransporter(TransporterDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        Transporter transporter = Transporter.builder()
                .user(user)
                .companyName(dto.getCompanyName())
                .vehicleNo(dto.getVehicleNo())
                .licenseNo(dto.getLicenseNo())
                .aadhaarNo(dto.getAadhaarNo())
                .build();

         transporterRepository.save(transporter);
    }

    @Override
    public Transporter updateTransporter(Long id, TransporterDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        Transporter transporter = Transporter.builder()
                .id(id)
                .user(user)
                .companyName(dto.getCompanyName())
                .vehicleNo(dto.getVehicleNo())
                .licenseNo(dto.getLicenseNo())
                .aadhaarNo(dto.getAadhaarNo())
                .build();

        return transporterRepository.save(transporter);
    }

    @Override
    public List<Transporter> getAllTransporters() {
        return transporterRepository.findAll();
    }

    @Override
    public Optional<Transporter> getTransporterById(Long id) {
        return transporterRepository.findById(id);
    }

    @Override
    public void deleteTransporter(Long id) {
        transporterRepository.deleteById(id);
    }
}
