package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.CustomerDTO;
import com.logihub.logihub.entity.Customer;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.CustomerRepository;
import com.logihub.logihub.repository.UserRepository;
import com.logihub.logihub.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerServiceImpl implements CustomerService {

    private final CustomerRepository customerRepository;
    private final UserRepository userRepository;

    @Override
    public void createCustomer(CustomerDTO dto) {
        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        Customer customer = Customer.builder()
                .user(user)
                .contactNo(dto.getContactNo())
                .address(dto.getAddress())
                .city(dto.getCity())
                .build();

        customerRepository.save(customer);
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
    public Customer updateCustomer(Long id, CustomerDTO dto) {
        Customer existing = customerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer not found with id: " + id));

        User user = userRepository.findByEmail(dto.getUserEmail())
                .orElseThrow(() -> new RuntimeException("User not found with email: " + dto.getUserEmail()));

        existing.setUser(user);
        existing.setContactNo(dto.getContactNo());
        existing.setAddress(dto.getAddress());
        existing.setCity(dto.getCity());

        return customerRepository.save(existing);
    }

    @Override
    public void deleteCustomer(Long id) {
        customerRepository.deleteById(id);
    }
}
