package com.logihub.logihub.service.impl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.logihub.logihub.dto.TransporterDTO;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.TransporterRepository;
import com.logihub.logihub.repository.UserRepository;
import com.logihub.logihub.service.TransporterService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TransporterServiceImpl implements TransporterService {

    private final TransporterRepository transporterRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;

    @Override
    public Transporter createTransporter(TransporterDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        // Map fields except binary ones
        Transporter transporter = modelMapper.map(dto, Transporter.class);
        transporter.setUser(user);

        try {
            if (dto.getProfilePhoto() != null && !dto.getProfilePhoto().isEmpty()) {
                String photoUrl = uploadToCloudinary(dto.getProfilePhoto());
                transporter.setProfilePhotoUrl(photoUrl);
            }

            // ✅ Upload RC Proof Document
            if (dto.getRcProofDocument() != null && !dto.getRcProofDocument().isEmpty()) {
                String rcUrl = uploadToCloudinary(dto.getRcProofDocument());
                transporter.setRcProofDocumentUrl(rcUrl);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error processing uploaded files", e);
        }

          return transporterRepository.save(transporter);
    }

    @Override
    public Transporter updateTransporter(Long id, TransporterDTO dto) {
        Transporter existing = transporterRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Transporter not found with ID: " + id));

        modelMapper.map(dto, existing);

        try {
            if (dto.getProfilePhoto() != null && !dto.getProfilePhoto().isEmpty()) {
                String photoUrl = uploadToCloudinary(dto.getProfilePhoto());
                existing.setProfilePhotoUrl(photoUrl);
            }

            if (dto.getRcProofDocument() != null && !dto.getRcProofDocument().isEmpty()) {
                String rcUrl = uploadToCloudinary(dto.getRcProofDocument());
                existing.setRcProofDocumentUrl(rcUrl);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error updating file data", e);
        }

        return transporterRepository.save(existing);
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

    @Override
    public Optional<Transporter> getTransporterByUserEmail(String email) {
        return transporterRepository.findByUserEmail(email);
    }

    // 🔹 Helper method to upload to Cloudinary
    private String uploadToCloudinary(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public List<Transporter> findByCompanyName(String companyName) {
        return transporterRepository.findByCompanyNameContainingIgnoreCase(companyName);
    }

}
