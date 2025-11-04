package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.CustomerBookingRequestDTO;
import com.logihub.logihub.dto.CustomerPaymentDto;
import com.logihub.logihub.dto.DriverAssignmentDto;
import com.logihub.logihub.entity.CustomerBooking;
import com.logihub.logihub.entity.Wallet;
import com.logihub.logihub.entity.WalletTransaction;
import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.enums.PaymentStatus;
import com.logihub.logihub.enums.TransactionType;
import com.logihub.logihub.enums.WalletOwnerType;
import com.logihub.logihub.repository.CustomerBookingRepository;
import com.logihub.logihub.repository.WalletRepository;
import com.logihub.logihub.repository.WalletTransactionRepository;
import com.logihub.logihub.service.CustomerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerBookingServiceImpl implements CustomerBookingService {

    private final CustomerBookingRepository bookingRepository;
    private final WalletRepository walletRepository;
    private final WalletTransactionRepository walletTransactionRepository;

    @Override
    public CustomerBooking createBooking(CustomerBookingRequestDTO dto) {
        CustomerBooking booking = CustomerBooking.builder()
                .customerId(dto.getCustomerId())
                .pickupAddress(dto.getPickupAddress())
                .dropAddress(dto.getDropAddress())
                .ExpectDeliveryDate(dto.getExpectDeliveryDate())
                .estimatedCost(dto.getEstimatedCost())
                .goodsDescription(dto.getGoodsDescription())
                .vehicleType(dto.getVehicalType())
                .bookingDate(LocalDateTime.now())
                .status(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }

    @Override
    public CustomerBooking acceptBookingByTransporter(Long bookingId, Long transporterId) {
        CustomerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // Check if already accepted
        if (booking.getStatus() != BookingStatus.PENDING) {
            throw new RuntimeException("Booking is not in pending state or already accepted.");
        }

        // Assign transporter ID
        booking.setTransporterId(transporterId);
        booking.setStatus(BookingStatus.ACCEPTED);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    @Override
    public CustomerBooking updateHalfPayment(CustomerPaymentDto dto) {
        CustomerBooking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getTransporterId() == null) {
            throw new RuntimeException("Transporter not assigned yet. Please assign transporter before payment.");
        }

        // ✅ Fetch wallets based on relationships
        Wallet customerWallet = walletRepository.findByCustomer_Id(booking.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer wallet not found"));

        Wallet transporterWallet = walletRepository.findByTransporter_Id(booking.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter wallet not found"));

        // ✅ Check customer wallet balance
        if (customerWallet.getBalance() < dto.getAmountPaid()) {
            throw new RuntimeException("Insufficient balance in customer wallet");
        }

        // ✅ Deduct from customer
        customerWallet.setBalance(customerWallet.getBalance() - dto.getAmountPaid());
        walletRepository.save(customerWallet);

        // ✅ Add to transporter
        transporterWallet.setBalance(transporterWallet.getBalance() + dto.getAmountPaid());
        walletRepository.save(transporterWallet);

        // ✅ Log customer transaction
        WalletTransaction customerTxn = WalletTransaction.builder()
                .walletId(customerWallet.getId())
                .relatedWalletId(transporterWallet.getId())
                .transactionType(TransactionType.TRANSFER)
                .amount(-dto.getAmountPaid())
                .description("Half payment for booking ID: " + dto.getBookingId())
                .timestamp(LocalDateTime.now())
                .ownerType(WalletOwnerType.CUSTOMER)
                .build();
        walletTransactionRepository.save(customerTxn);

        // ✅ Log transporter transaction
        WalletTransaction transporterTxn = WalletTransaction.builder()
                .walletId(transporterWallet.getId())
                .relatedWalletId(customerWallet.getId())
                .transactionType(TransactionType.ADD)
                .amount(dto.getAmountPaid())
                .description("Received half payment for booking ID: " + dto.getBookingId())
                .timestamp(LocalDateTime.now())
                .ownerType(WalletOwnerType.TRANSPORTER)
                .build();
        walletTransactionRepository.save(transporterTxn);

        // ✅ Update booking
        booking.setPaymentStatus(PaymentStatus.HALF_PAID);
        booking.setStatus(BookingStatus.ACCEPTED);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }
    @Override
    public CustomerBooking assignDriver(DriverAssignmentDto dto) {
        CustomerBooking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setTransporterId(dto.getTransporterId());
        booking.setDriverId(dto.getDriverId());
        booking.setVehicleId(dto.getVehicleId());
        booking.setPickupDate(dto.getPickupDate());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    @Override
    public Optional<CustomerBooking> getBookingById(Long id) {
        return bookingRepository.findById(id);
    }

    @Override
    public List<CustomerBooking> getBookingsByCustomerId(Long customerId) {
        return bookingRepository.findByCustomerId(customerId);
    }

    @Override
    public List<CustomerBooking> getBookingsByStatus(BookingStatus status) {
        return bookingRepository.findByStatus(status);
    }
}
