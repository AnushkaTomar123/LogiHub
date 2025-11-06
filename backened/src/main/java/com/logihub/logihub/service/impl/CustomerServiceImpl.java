package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.CustomerDTO;
import com.logihub.logihub.entity.Customer;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.CustomerRepository;
import com.logihub.logihub.repository.UserRepository;
import com.logihub.logihub.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final Cloudinary cloudinary;

    @Override
    public Customer createCustomer(CustomerDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        // DTO -> Entity mapping
        Customer customer = modelMapper.map(dto, Customer.class);
        customer.setUser(user);

        // Upload profile photo to Cloudinary
        try {
            if (dto.getProfilePhoto() != null && !dto.getProfilePhoto().isEmpty()) {
                String url = uploadToCloudinary(dto.getProfilePhoto());
                customer.setProfilePhotoUrl(url);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error uploading profile photo", e);
        }

        return  customerRepository.save(customer);
    }

    @Override
    public Customer updateCustomer(Long id, CustomerDTO dto) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        modelMapper.map(dto, existing);
        existing.setUser(user);

        // Update profile photo if new file provided
        try {
            if (dto.getProfilePhoto() != null && !dto.getProfilePhoto().isEmpty()) {
                String url = uploadToCloudinary(dto.getProfilePhoto());
                existing.setProfilePhotoUrl(url);
            }
        } catch (IOException e) {
            throw new RuntimeException("Error uploading profile photo", e);
        }

        return customerRepository.save(existing);
    }

    @Override
    public List<Customer> getAllCustomers() {
        return customerRepository.findAll();
    }

    @Override
    public Optional<Customer> getCustomerById(Long id) {
        return customerRepository.findById(id);
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }

    // Cloudinary helper
    private String uploadToCloudinary(MultipartFile file) throws IOException {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(),
                ObjectUtils.asMap("resource_type", "auto"));
        return uploadResult.get("secure_url").toString();
    }

    @Override
    public Optional<Customer> getCustomerByUserEmail(String email) {
        return customerRepository.findByUserEmail(email);
    }

}
