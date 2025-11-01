package com.logihub.logihub.service;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;
import com.logihub.logihub.dto.CustomerBookingResponseDTO;
import com.logihub.logihub.dto.CustomerPaymentDto;
import com.logihub.logihub.dto.DriverAssignmentDto;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;

import java.util.List;
import java.util.Optional;

public interface CustomerBookingService {

    CustomerBooking createBooking(CustomerBookingRequestDTO dto);

    CustomerBooking updateHalfPayment(CustomerPaymentDto dto);

    CustomerBooking assignDriver(DriverAssignmentDto dto);

    Optional<CustomerBooking> getBookingById(Long id);

    List<CustomerBooking> getBookingsByCustomerId(Long customerId);

    List<CustomerBooking> getBookingsByStatus(BookingStatus status);
}