package com.logihub.logihub.service;

import com.logihub.logihub.dto.TransporterDTO;
import com.logihub.logihub.entity.Transporter;

import java.util.List;
import java.util.Optional;

public interface TransporterService {

    void createTransporter(TransporterDTO dto);

    Transporter updateTransporter(Long id, TransporterDTO dto);

    List<Transporter> getAllTransporters();

    Optional<Transporter> getTransporterById(Long id);

    void deleteTransporter(Long id);
}
