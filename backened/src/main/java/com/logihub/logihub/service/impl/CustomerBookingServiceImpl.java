package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;
import com.logihub.logihub.dto.CustomerBookingResponseDTO;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.entity.BookingStatus;
import com.logihub.logihub.entity.PaymentStatus;
import com.logihub.logihub.repository.CustomerBookingRepository;
import com.logihub.logihub.service.CustomerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CustomerBookingServiceImpl implements CustomerBookingService {

    private final CustomerBookingRepository bookingRepository;

    @Override
    public CustomerBookingResponseDTO requestBooking(CustomerBookingRequestDTO dto) {
        CustomerBooking booking = new CustomerBooking();
        booking.setCustomerId(dto.getCustomerId());
        booking.setPickupAddress(dto.getPickupAddress());
        booking.setDropAddress(dto.getDropAddress());
        booking.setPickupDate(dto.getPickupDate());
        booking.setDeliveryDate(dto.getDeliveryDate());
        booking.setEstimatedDistanceKm(dto.getEstimatedDistanceKm());
        booking.setEstimatedCost(dto.getEstimatedCost());

        booking.setBookingDate(LocalDateTime.now());  // manually set
        booking.setStatus(BookingStatus.REQUESTED);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());

        CustomerBooking saved = bookingRepository.save(booking);

        return mapToResponseDTO(saved);
    }

    @Override
    public CustomerBookingResponseDTO acceptBooking(Long bookingId, Long transporterId, Long vehicleId, Long driverId) {
        CustomerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(BookingStatus.ACCEPTED);
        booking.setTransporterId(transporterId);
        booking.setVehicleId(vehicleId);
        booking.setDriverId(driverId);
        booking.setUpdatedAt(LocalDateTime.now());

        CustomerBooking updated = bookingRepository.save(booking);

        return mapToResponseDTO(updated);
    }

    @Override
    public List<CustomerBookingResponseDTO> getBookingsByCustomer(Long customerId) {
        return bookingRepository.findByCustomerId(customerId).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<CustomerBookingResponseDTO> getBookingsByStatus(String status) {
        return bookingRepository.findByStatus(status).stream()
                .map(this::mapToResponseDTO)
                .collect(Collectors.toList());
    }

    // Manual mapping method
    private CustomerBookingResponseDTO mapToResponseDTO(CustomerBooking booking) {
        CustomerBookingResponseDTO response = new CustomerBookingResponseDTO();
        response.setId(booking.getId());
        response.setCustomerId(booking.getCustomerId());
        response.setPickupAddress(booking.getPickupAddress());
        response.setDropAddress(booking.getDropAddress());
        response.setPickupDate(booking.getPickupDate());
        response.setDeliveryDate(booking.getDeliveryDate());
        response.setEstimatedDistanceKm(booking.getEstimatedDistanceKm());
        response.setEstimatedCost(booking.getEstimatedCost());
        response.setBookingDate(booking.getBookingDate());
        response.setStatus(booking.getStatus());
        response.setPaymentStatus(booking.getPaymentStatus());
        response.setTransporterId(booking.getTransporterId());
        response.setVehicleId(booking.getVehicleId());
        response.setDriverId(booking.getDriverId());
        return response;
    }
}
