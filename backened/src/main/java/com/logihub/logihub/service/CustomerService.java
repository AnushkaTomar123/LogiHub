package com.logihub.logihub.service;

import com.logihub.logihub.dto.CustomerDTO;
import com.logihub.logihub.entity.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {

    Customer createCustomer(CustomerDTO dto);

    List<Customer> getAllCustomers();

    Optional<Customer> getCustomerById(Long id);

    Customer updateCustomer(Long id, CustomerDTO dto);

    void deleteCustomer(Long id);

    Optional<Customer> getCustomerByUserEmail(String email);

}
