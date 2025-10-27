package com.logihub.logihub.controller;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;
import com.logihub.logihub.dto.CustomerBookingResponseDTO;
import com.logihub.logihub.service.CustomerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@RequiredArgsConstructor
public class CustomerBookingController {

    private final CustomerBookingService bookingService;

    // Customer requests a booking
    @PostMapping("/request")
    public CustomerBookingResponseDTO requestBooking(@RequestBody CustomerBookingRequestDTO dto) {
        return bookingService.requestBooking(dto);
    }

    // Transporter accepts the booking
    @PutMapping("/accept/{bookingId}")
    public CustomerBookingResponseDTO acceptBooking(@PathVariable Long bookingId,
                                                    @RequestParam Long transporterId,
                                                    @RequestParam Long vehicleId,
                                                    @RequestParam Long driverId) {
        return bookingService.acceptBooking(bookingId, transporterId, vehicleId, driverId);
    }

    // Get bookings by customer
    @GetMapping("/customer/{customerId}")
    public List<CustomerBookingResponseDTO> getBookingsByCustomer(@PathVariable Long customerId) {
        return bookingService.getBookingsByCustomer(customerId);
    }

    // Get bookings by status (e.g., REQUESTED, ACCEPTED)
    @GetMapping("/status")
    public List<CustomerBookingResponseDTO> getBookingsByStatus(@RequestParam String status) {
        return bookingService.getBookingsByStatus(status);
    }
}
