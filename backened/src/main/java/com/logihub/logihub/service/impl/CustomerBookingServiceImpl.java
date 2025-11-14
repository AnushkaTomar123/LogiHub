package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.*;
import com.logihub.logihub.entity.*;
import com.logihub.logihub.enums.*;
import com.logihub.logihub.repository.CustomerBookingRepository;
import com.logihub.logihub.repository.VehicleRepository;
import com.logihub.logihub.repository.DriverRepository;
import com.logihub.logihub.repository.WalletRepository;
import com.logihub.logihub.repository.WalletTransactionRepository;
import com.logihub.logihub.service.CustomerBookingService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomerBookingServiceImpl implements CustomerBookingService {


    private final  DriverRepository driverRepository;


    private  final VehicleRepository vehicleRepository;


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
                .vehicleType(dto.getVehicleType())
                .pickupDate(dto.getPickupDate())
                .capacity(dto.getCapacity())
                .vehicleType(dto.getVehicleType())
                .bookingDate(LocalDate.now())
                .status(BookingStatus.PENDING)
                .paymentStatus(PaymentStatus.PENDING)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

        return bookingRepository.save(booking);
    }



    @Override
    public CustomerBooking cancelBooking(Long bookingId, Long customerId) {
        CustomerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // ✅ Check if the same customer is canceling
        if (!booking.getCustomerId().equals(customerId)) {
            throw new RuntimeException("You are not authorized to cancel this booking");
        }

        // ✅ Only allow cancellation before payment
        if (booking.getPaymentStatus() != PaymentStatus.PENDING) {
            throw new RuntimeException("Booking cannot be cancelled after payment started");
        }

        // ✅ Reset booking details
        booking.setTransporterId(null);
        booking.setDriverId(null);
        booking.setVehicleId(null);
        booking.setProposedCost(null);
        booking.setFinalCost(null);
        booking.setHalfAmount(null);
        booking.setRemainingAmount(null);
        booking.setLastProposedBy(null);
        booking.setIsCustomerProposed(null);
        booking.setStatus(BookingStatus.PENDING);
        booking.setPaymentStatus(PaymentStatus.PENDING);
        booking.setUpdatedAt(LocalDateTime.now());

        // ✅ Optionally reset driver/vehicle status if they were assigned
        if (booking.getDriverId() != null) {
            driverRepository.findById(booking.getDriverId()).ifPresent(driver -> {
                driver.setStatus(DriverStatus.AVAILABLE);
                driverRepository.save(driver);
            });
        }

        if (booking.getVehicleId() != null) {
            vehicleRepository.findById(booking.getVehicleId()).ifPresent(vehicle -> {
                vehicle.setStatus(VehicleStatus.AVAILABLE);
                vehicleRepository.save(vehicle);
            });
        }

        return bookingRepository.save(booking);
    }


    // ✅ Step 1: Propose new price (either customer or transporter)
    public CustomerBooking proposeNewPrice(PriceProposalDto dto) {
        CustomerBooking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() == BookingStatus.ACCEPTED || booking.getStatus() == BookingStatus.COMPLETED) {
            throw new RuntimeException("Cannot negotiate on completed or accepted booking");
        }

        booking.setProposedCost(dto.getProposedPrice());
        booking.setLastProposedBy(dto.getUserId());
        booking.setIsCustomerProposed(dto.isCustomerProposed());
        booking.setStatus(BookingStatus.NEGOTIATION_IN_PROGRESS);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    // ✅ Step 2: Accept proposed price
    public CustomerBooking acceptProposedPrice(AcceptPriceDto dto) {
        CustomerBooking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getStatus() != BookingStatus.NEGOTIATION_IN_PROGRESS) {
            throw new RuntimeException("No active negotiation for this booking");
        }

        if ((booking.getIsCustomerProposed() && dto.isCustomerProposed()) ||
                (!booking.getIsCustomerProposed() && !dto.isCustomerProposed())) {
            throw new RuntimeException("You cannot accept your own proposal");
        }

        booking.setFinalCost(booking.getProposedCost());
        booking.setStatus(BookingStatus.PRICE_LOCKED);
        booking.setUpdatedAt(LocalDateTime.now());

        return bookingRepository.save(booking);
    }

    // ✅ Step 3: Transporter confirms booking
    public CustomerBooking confirmBooking(Long bookingId, Long transporterId) {
        CustomerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
        if (booking.getStatus() != BookingStatus.PRICE_LOCKED &&
                !(booking.getStatus() == BookingStatus.PENDING && booking.getEstimatedCost() != null)) {
            throw new RuntimeException("Booking is not ready for confirmation");
        }

        booking.setTransporterId(transporterId);
        if (booking.getStatus() == BookingStatus.PENDING) {
            booking.setFinalCost(booking.getEstimatedCost());
        }
        booking.setStatus(BookingStatus.AWAITING_PAYMENT);
        booking.setUpdatedAt(LocalDateTime.now());

        Double totalPrice = booking.getFinalCost();

        if (totalPrice == null || totalPrice <= 0) {
            throw new RuntimeException("Final cost is not set for this booking");
        }

        Double halfAmount = totalPrice / 2;
        Double remainingAmount = totalPrice - halfAmount;

        booking.setHalfAmount(halfAmount);
        booking.setRemainingAmount(remainingAmount);

        return bookingRepository.save(booking);
    }

    @Override
    public CustomerBooking updateHalfPayment(CustomerPaymentDto dto) {
        CustomerBooking booking = bookingRepository.findById(dto.getBookingId())
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getTransporterId() == null) {
            throw new RuntimeException("Transporter not assigned yet. Please assign transporter before payment.");
        }

        Double halfAmount = booking.getHalfAmount();
        Double remainingAmount = booking.getRemainingAmount();

        if (halfAmount == null || remainingAmount == null) {
            throw new RuntimeException("Half or remaining amount not set. Please confirm booking first.");
        }


        // ✅ Fetch wallets based on relationships
        Wallet customerWallet = walletRepository.findByCustomer_Id(booking.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer wallet not found"));

        Wallet transporterWallet = walletRepository.findByTransporter_Id(booking.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter wallet not found"));

        // ✅ Check customer wallet balance
        if (customerWallet.getBalance() < halfAmount) {
            throw new RuntimeException("Insufficient balance in customer wallet");
        }
        // ✅ Deduct from customer
        customerWallet.setBalance(customerWallet.getBalance() - halfAmount);
        transporterWallet.setBalance(transporterWallet.getBalance() + halfAmount);
        walletRepository.save(customerWallet);
        walletRepository.save(transporterWallet);
        // ✅ Log customer transaction
        WalletTransaction customerTxn = WalletTransaction.builder()
                .walletId(customerWallet.getId())
                .relatedWalletId(transporterWallet.getId())
                .transactionType(TransactionType.TRANSFER_OUT)
                .amount(-halfAmount)
                .description("Half payment for booking ID: " + dto.getBookingId())
                .timestamp(LocalDateTime.now())
                .ownerType(WalletOwnerType.CUSTOMER)
                .build();
        walletTransactionRepository.save(customerTxn);

        // ✅ Log transporter transaction
        WalletTransaction transporterTxn = WalletTransaction.builder()
                .walletId(transporterWallet.getId())
                .relatedWalletId(customerWallet.getId())
                .transactionType(TransactionType.TRANSFER_IN)
                .amount(halfAmount)
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

        // ✅ Fetch Driver and Vehicle from DB
        Driver driver = driverRepository.findById(dto.getDriverId())
                .orElseThrow(() -> new RuntimeException("Driver not found"));
        Vehicle vehicle = vehicleRepository.findById(dto.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        // ✅ Update their status
        driver.setStatus(DriverStatus.ON_DUTY);
        vehicle.setStatus(VehicleStatus.ON_ROUTE);

        driverRepository.save(driver);
        vehicleRepository.save(vehicle);

        // ✅ Update booking details
        booking.setTransporterId(dto.getTransporterId());
        booking.setDriverId(dto.getDriverId());
        booking.setVehicleId(dto.getVehicleId());
        booking.setPickupDate(dto.getPickupDate());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking.setUpdatedAt(LocalDateTime.now());

        CustomerBooking savedBooking = bookingRepository.save(booking);

        // 🚚 After confirmation, automatically mark as delivered after 10 seconds
        new Thread(() -> {
            try {
                Thread.sleep(60000); // 60 seconds delay
                savedBooking.setStatus(BookingStatus.DELIVERED);
                bookingRepository.save(savedBooking);

                System.out.println("✅ Booking delivered automatically after 10 sec: " + savedBooking.getId());
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }).start();

        return savedBooking;
    }

    @Override
    public CustomerBooking payRemainingAmount(Long bookingId) {
        CustomerBooking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        if (booking.getPaymentStatus() != PaymentStatus.HALF_PAID) {
            throw new RuntimeException("Remaining payment applicable only after half payment!");
        }

        Double remainingAmount = booking.getRemainingAmount();
        if (remainingAmount == null || remainingAmount <= 0) {
            throw new RuntimeException("Remaining amount not set for this booking!");
        }

        // ✅ Fetch wallets
        Wallet customerWallet = walletRepository.findByCustomer_Id(booking.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer wallet not found"));
        Wallet transporterWallet = walletRepository.findByTransporter_Id(booking.getTransporterId())
                .orElseThrow(() -> new RuntimeException("Transporter wallet not found"));

        // ✅ Check balance
        if (customerWallet.getBalance() < remainingAmount) {
            System.out.println("⚠️ Customer has insufficient balance for remaining payment");
            return booking;
        }

        // ✅ Transfer money
        customerWallet.setBalance(customerWallet.getBalance() - remainingAmount);
        transporterWallet.setBalance(transporterWallet.getBalance() + remainingAmount);
        walletRepository.save(customerWallet);
        walletRepository.save(transporterWallet);

        // ✅ Transactions log
        WalletTransaction customerTxn = WalletTransaction.builder()
                .walletId(customerWallet.getId())
                .relatedWalletId(transporterWallet.getId())
                .transactionType(TransactionType.TRANSFER_OUT)
                .amount(-remainingAmount)
                .description("Remaining payment for booking ID: " + bookingId)
                .timestamp(LocalDateTime.now())
                .ownerType(WalletOwnerType.CUSTOMER)
                .build();
        walletTransactionRepository.save(customerTxn);

        WalletTransaction transporterTxn = WalletTransaction.builder()
                .walletId(transporterWallet.getId())
                .relatedWalletId(customerWallet.getId())
                .transactionType(TransactionType.TRANSFER_IN)
                .amount(remainingAmount)
                .description("Received remaining payment for booking ID: " + bookingId)
                .timestamp(LocalDateTime.now())
                .ownerType(WalletOwnerType.TRANSPORTER)
                .build();
        walletTransactionRepository.save(transporterTxn);

        // ✅ Update booking
        booking.setPaymentStatus(PaymentStatus.FULL_PAID);
        booking.setUpdatedAt(LocalDateTime.now());
        bookingRepository.save(booking);

        System.out.println("💰 Remaining payment completed successfully for booking ID: " + bookingId);
        return booking;
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

    @Override
    public List<CustomerBooking> searchBookings(String pickupAddress, String dropAddress) {
        if (pickupAddress != null && dropAddress != null) {
            return bookingRepository.findByPickupAddressContainingIgnoreCaseAndDropAddressContainingIgnoreCase(pickupAddress, dropAddress);
        } else if (pickupAddress != null) {
            return bookingRepository.findByPickupAddressContainingIgnoreCase(pickupAddress);
        } else if (dropAddress != null) {
            return bookingRepository.findByDropAddressContainingIgnoreCase(dropAddress);
        } else {
            return bookingRepository.findAll();
        }
    }

    @Override
    public List<CustomerBooking> getBookingsForTransporter(Long transporterId) {
        List<BookingStatus> statuses = List.of(BookingStatus.CONFIRMED, BookingStatus.DELIVERED);
        return bookingRepository.findByTransporterIdAndStatuses(transporterId, statuses);
    }

    @Override
    public List<CustomerBooking> getAllBookingsInDescOrder() {
        return bookingRepository.findAllByOrderByIdDesc();
    }

}
