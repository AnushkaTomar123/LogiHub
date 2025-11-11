package com.logihub.logihub.service;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.enums.BookingStatus;

import java.util.List;
import java.util.Optional;

public interface CustomerBookingService {

    CustomerBooking createBooking(CustomerBookingRequestDTO dto);
   // CustomerBooking acceptBookingByTransporter(Long bookingId, Long transporterId);
    CustomerBooking confirmBooking(Long bookingId, Long transporterId);
    CustomerBooking acceptProposedPrice(AcceptPriceDto dto);
    CustomerBooking updateHalfPayment(CustomerPaymentDto dto);

    CustomerBooking assignDriver(DriverAssignmentDto dto);

    Optional<CustomerBooking> getBookingById(Long id);

    List<CustomerBooking> getBookingsByCustomerId(Long customerId);

    List<CustomerBooking> getBookingsByStatus(BookingStatus status);
     CustomerBooking proposeNewPrice(PriceProposalDto dto);

    List<CustomerBooking> searchBookings(String pickupAddress, String dropAddress);
  List<CustomerBooking> getBookingsForTransporter(Long transporterId);
 List<CustomerBooking> getAllBookingsInDescOrder();
    CustomerBooking payRemainingAmount(Long bookingId);
}