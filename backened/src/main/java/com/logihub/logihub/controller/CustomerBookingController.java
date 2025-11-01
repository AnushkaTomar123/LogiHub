package com.logihub.logihub.controller;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;

import com.logihub.logihub.dto.CustomerPaymentDto;
import com.logihub.logihub.dto.DriverAssignmentDto;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.service.CustomerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class CustomerBookingController {

    private final CustomerBookingService bookingService;

    @PostMapping("/create")
    public ResponseEntity<CustomerBooking> createBooking(@RequestBody CustomerBookingRequestDTO dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    @PostMapping("/payment/half")
    public ResponseEntity<CustomerBooking> halfPayment(@RequestBody CustomerPaymentDto dto) {
        return ResponseEntity.ok(bookingService.updateHalfPayment(dto));
    }

    @PostMapping("/assign-driver")
    public ResponseEntity<CustomerBooking> assignDriver(@RequestBody DriverAssignmentDto dto) {
        return ResponseEntity.ok(bookingService.assignDriver(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<CustomerBooking> getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerBooking>> getBookingsByCustomer(@PathVariable Long customerId) {
        return ResponseEntity.ok(bookingService.getBookingsByCustomerId(customerId));
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<CustomerBooking>> getBookingsByStatus(@PathVariable BookingStatus status) {
        return ResponseEntity.ok(bookingService.getBookingsByStatus(status));
    }
}
