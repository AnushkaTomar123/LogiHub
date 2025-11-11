package com.logihub.logihub.service.impl;


import com.logihub.logihub.dto.UserProfileDTO;
import com.logihub.logihub.entity.*;
import com.logihub.logihub.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserProfileService {

    @Autowired private UserRepository userRepository;
    @Autowired private TransporterRepository transporterRepository;
    @Autowired private CustomerRepository customerRepository;
    @Autowired private AdminRepository adminRepository;

    // ✅ Get single user profile by user ID
    public UserProfileDTO getUserProfileById(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return buildUserProfile(user);
    }

    // ✅ Get single user profile by email
    public UserProfileDTO getUserProfileByEmail(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found with email: " + email));
        return buildUserProfile(user);
    }

    // ✅ Get all users with full profile
    public List<UserProfileDTO> getAllUserProfiles() {
        List<User> users = userRepository.findAll();
        return users.stream()
                .map(this::buildUserProfile)
                .collect(Collectors.toList());
    }

    // ✅ Private helper to merge data based on role
    private UserProfileDTO buildUserProfile(User user) {
        UserProfileDTO.UserProfileDTOBuilder profile = UserProfileDTO.builder()
                .userId(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .role(user.getRole());

        switch (user.getRole().toUpperCase()) {
            case "TRANSPORTER" -> {
                Optional<Transporter> tOpt = transporterRepository.findByUserId(user.getId());
                tOpt.ifPresent(t -> profile
                        .companyName(t.getCompanyName())
                        .contactPersonName(t.getContactPersonName())
                        .contactNumber(t.getContactNumber())
                        .address(t.getAddress())
                        .panNumber(t.getPanNumber())
                        .aadhaarNumber(t.getAadhaarNumber())
                        .totalVehicles(t.getTotalVehicles())
                        .vehicleTypes(t.getVehicleTypes())
                        .profilePhotoUrl(t.getProfilePhotoUrl())
                        .rcProofDocumentUrl(t.getRcProofDocumentUrl())
                        .drivers(t.getDrivers())
                        .vehicles(t.getVehicles()));
            }
            case "CUSTOMER" -> {
                Optional<Customer> cOpt = customerRepository.findByUserId(user.getId());
                cOpt.ifPresent(c -> profile
                        .contactNo(c.getContactNo())
                        .address(c.getAddress())
                        .aadhar(c.getAadhar())
                        .profilePhotoUrl(c.getProfilePhotoUrl()));
            }
//            case "ADMIN" -> {
//                Optional<Admin> aOpt = adminRepository.findByUserId(user.getId());
//                aOpt.ifPresent(a -> profile.adminCode(a.getAdminCode()));
//            }
        }

        return profile.build();
    }
}
