package com.logihub.logihub.controller;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.service.CustomerBookingService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class CustomerBookingController {

    private final CustomerBookingService bookingService;

    // ✅ Create new booking
    @PostMapping("/create")
    public ResponseEntity<CustomerBooking> createBooking(@Valid @RequestBody CustomerBookingRequestDTO dto) {
        CustomerBooking booking = bookingService.createBooking(dto);
        return new ResponseEntity<>(booking, HttpStatus.CREATED); // 201
    }

    // ✅ Propose new price
    @PostMapping("/propose-price")
    public ResponseEntity<CustomerBooking> proposePrice(@RequestBody PriceProposalDto dto) {
        CustomerBooking booking = bookingService.proposeNewPrice(dto);
        return new ResponseEntity<>(booking, HttpStatus.OK); // 200
    }

    // ✅ Accept proposed price
    @PostMapping("/accept-price")
    public ResponseEntity<CustomerBooking> acceptPrice(@RequestBody AcceptPriceDto dto) {
        CustomerBooking booking = bookingService.acceptProposedPrice(dto);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    // ✅ Half payment
    @PostMapping("/payment/half")
    public ResponseEntity<CustomerBooking> halfPayment(@Valid @RequestBody CustomerPaymentDto dto) {
        CustomerBooking booking = bookingService.updateHalfPayment(dto);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    // ✅ Assign driver
    @PostMapping("/assign-driver")
    public ResponseEntity<CustomerBooking> assignDriver(@Valid @RequestBody DriverAssignmentDto dto) {
        CustomerBooking booking = bookingService.assignDriver(dto);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    // ✅ Get single booking by ID
    @GetMapping("/{id}")
    public ResponseEntity<CustomerBooking> getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id)
                .map(booking -> new ResponseEntity<>(booking, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND)); // 404
    }

    // ✅ Get all bookings of a customer
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<CustomerBooking>> getBookingsByCustomer(@PathVariable Long customerId) {
        List<CustomerBooking> bookings = bookingService.getBookingsByCustomerId(customerId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // ✅ Get all bookings by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<CustomerBooking>> getBookingsByStatus(@PathVariable BookingStatus status) {
        List<CustomerBooking> bookings = bookingService.getBookingsByStatus(status);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // ✅ Confirm booking by transporter
    @PostMapping("/{bookingId}/confirm/{transporterId}")
    public ResponseEntity<CustomerBooking> confirmBooking(@PathVariable Long bookingId, @PathVariable Long transporterId) {
        CustomerBooking booking = bookingService.confirmBooking(bookingId, transporterId);
        return new ResponseEntity<>(booking, HttpStatus.OK);
    }

    // ✅ Search bookings (pickup & drop filter)
    @GetMapping("/search")
    public ResponseEntity<List<CustomerBooking>> searchBookings(
            @RequestParam(required = false) String pickupAddress,
            @RequestParam(required = false) String dropAddress) {
        List<CustomerBooking> bookings = bookingService.searchBookings(pickupAddress, dropAddress);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    // ✅ Get bookings assigned to a transporter
    @GetMapping("/transporter/{transporterId}/bookings")
    public ResponseEntity<List<CustomerBooking>> getTransporterBookings(@PathVariable Long transporterId) {
        List<CustomerBooking> bookings = bookingService.getBookingsForTransporter(transporterId);
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @GetMapping("/all/desc")
    public ResponseEntity<List<CustomerBooking>> getAllBookingsDesc() {
        List<CustomerBooking> bookings = bookingService.getAllBookingsInDescOrder();
        return new ResponseEntity<>(bookings, HttpStatus.OK);
    }

    @PostMapping("/remaining/{bookingId}")
    public ResponseEntity<CustomerBooking> payRemaining(@PathVariable Long bookingId) {
        CustomerBooking booking = bookingService.payRemainingAmount(bookingId);
        return ResponseEntity.ok(booking);
    }

    @PutMapping("/{bookingId}/cancel/{customerId}")
    public ResponseEntity<CustomerBooking> cancelBooking(
            @PathVariable Long bookingId,
            @PathVariable Long customerId) {

        CustomerBooking canceledBooking = bookingService.cancelBooking(bookingId, customerId);
        return ResponseEntity.ok(canceledBooking);
    }
}
