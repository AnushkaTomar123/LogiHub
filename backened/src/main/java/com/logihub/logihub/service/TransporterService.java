package com.logihub.logihub.service;

import com.logihub.logihub.dto.TransporterDTO;
import com.logihub.logihub.entity.Transporter;

import java.util.List;
import java.util.Optional;

public interface TransporterService {

    Transporter createTransporter(TransporterDTO dto);

    Transporter updateTransporter(Long id, TransporterDTO dto);

    List<Transporter> getAllTransporters();

    Optional<Transporter> getTransporterById(Long id);

    Optional<Transporter> getTransporterByUserEmail(String email);

    void deleteTransporter(Long id);

    List<Transporter> findByCompanyName(String companyName);

}
