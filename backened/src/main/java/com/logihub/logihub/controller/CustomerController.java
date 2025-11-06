package com.logihub.logihub.controller;

import com.logihub.logihub.dto.CustomerDTO;
import com.logihub.logihub.entity.Customer;
import com.logihub.logihub.service.CustomerService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/customers")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    // ✅ Create Customer (multipart form)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Customer> createCustomer(@Valid @ModelAttribute CustomerDTO dto) {
        Customer created = customerService.createCustomer(dto);
        return new ResponseEntity<>(created, HttpStatus.CREATED); // 201 Created
    }

    // ✅ Update Customer (multipart form)
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Customer> updateCustomer(@Valid @PathVariable Long id, @ModelAttribute CustomerDTO dto) {
        Customer updated = customerService.updateCustomer(id, dto);
        return new ResponseEntity<>(updated, HttpStatus.OK); // 200 OK
    }

    // ✅ Get all customers
    @GetMapping
    public ResponseEntity<List<Customer>> getAllCustomers() {
        List<Customer> customers = customerService.getAllCustomers();
        return new ResponseEntity<>(customers, HttpStatus.OK); // 200 OK
    }

    // ✅ Get customer by ID
    @GetMapping("/{id}")
    public ResponseEntity<Customer> getCustomerById(@PathVariable Long id) {
        return customerService.getCustomerById(id)
                .map(customer -> new ResponseEntity<>(customer, HttpStatus.OK)) // 200 OK
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // 404 Not Found
    }

    // ✅ Delete customer
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCustomer(@PathVariable Long id) {
        customerService.deleteCustomer(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // 204 No Content
    }

    // ✅ Get customer by user email
    @GetMapping("/by-email")
    public ResponseEntity<Customer> getCustomerByUserEmail(@RequestParam String email) {
        return customerService.getCustomerByUserEmail(email)
                .map(customer -> new ResponseEntity<>(customer, HttpStatus.OK)) // 200 OK
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // 404 Not Found
    }
}
