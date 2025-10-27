package com.logihub.logihub.service;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;
import com.logihub.logihub.dto.CustomerBookingResponseDTO;

import java.util.List;

public interface CustomerBookingService {

    // Customer requests a booking
    CustomerBookingResponseDTO requestBooking(CustomerBookingRequestDTO dto);

    // Transporter accepts the booking
    CustomerBookingResponseDTO acceptBooking(Long bookingId, Long transporterId, Long vehicleId, Long driverId);

    // Get all bookings by customer
    List<CustomerBookingResponseDTO> getBookingsByCustomer(Long customerId);

    // Get all bookings by status
    List<CustomerBookingResponseDTO> getBookingsByStatus(String status);
}
