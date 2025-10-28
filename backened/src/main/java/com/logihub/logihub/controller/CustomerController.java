package com.logihub.logihub.controller;

import com.logihub.logihub.dto.CustomerDTO;
import com.logihub.logihub.entity.Customer;
import com.logihub.logihub.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // Create Customer (multipart form)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<String> createCustomer(@ModelAttribute CustomerDTO dto) {
        customerService.createCustomer(dto);
        return ResponseEntity.ok("Customer registered successfully!");
    }

    // Update Customer (multipart form)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Customer> updateCustomer(
            @PathVariable Long id, @ModelAttribute CustomerDTO dto) {
        Customer updated = customerService.updateCustomer(id, dto);
        return ResponseEntity.ok(updated);
    }

    // Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        return ResponseEntity.ok(customerService.getAllCustomers());
    }

    // Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return ResponseEntity.noContent().build();
    }

    // Get customer by user email
    @GetMapping("/by-email")
    public ResponseEntity<Customer> getCustomerByUserEmail(@RequestParam String email) {
        return customerService.getCustomerByUserEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

}
