package com.logihub.logihub.controller;

import com.logihub.logihub.dto.*;

import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.service.CustomerBookingService;
import jakarta.validation.Valid;
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
    public ResponseEntity<CustomerBooking> createBooking(@Valid @RequestBody CustomerBookingRequestDTO dto) {
        return ResponseEntity.ok(bookingService.createBooking(dto));
    }

    @PostMapping("/propose-price")
    public ResponseEntity<CustomerBooking> proposePrice(@RequestBody PriceProposalDto dto) {
        return ResponseEntity.ok(bookingService.proposeNewPrice(dto));
    }

    @PostMapping("/accept-price")
    public ResponseEntity<CustomerBooking> acceptPrice(@RequestBody AcceptPriceDto dto) {
        return ResponseEntity.ok(bookingService.acceptProposedPrice(dto));
    }


    @PostMapping("/payment/half")
    public ResponseEntity<CustomerBooking> halfPayment(@Valid @RequestBody CustomerPaymentDto dto) {
        return ResponseEntity.ok(bookingService.updateHalfPayment(dto));
    }

    @PostMapping("/assign-driver")
    public ResponseEntity<CustomerBooking> assignDriver(@Valid @RequestBody DriverAssignmentDto dto) {
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

    @PostMapping("/{bookingId}/confirm/{transporterId}")
    public ResponseEntity<CustomerBooking> confirmBooking(@PathVariable Long bookingId, @PathVariable Long transporterId) {
        return ResponseEntity.ok(bookingService.confirmBooking(bookingId, transporterId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<CustomerBooking>> searchBookings(
            @RequestParam(required = false) String pickupAddress,
            @RequestParam(required = false) String dropAddress) {
        return ResponseEntity.ok(bookingService.searchBookings(pickupAddress, dropAddress));
    }

    @GetMapping("/transporter/{transporterId}/bookings")
    public ResponseEntity<List<CustomerBooking>> getTransporterBookings(@PathVariable Long transporterId) {
        List<CustomerBooking> bookings = bookingService.getBookingsForTransporter(transporterId);
        return ResponseEntity.ok(bookings);
    }



}
