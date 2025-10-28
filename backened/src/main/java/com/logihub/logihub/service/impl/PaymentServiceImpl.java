//package com.logihub.logihub.service.impl;
//
//import com.logihub.logihub.dto.PaymentDTO;
//import com.logihub.logihub.entity.*;
//import com.logihub.logihub.repository.CustomerRepository;
//import com.logihub.logihub.repository.TransporterRepository;
//import com.logihub.logihub.repository.PaymentRepository;
//import org.modelmapper.ModelMapper;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.UUID;
//
//@Service
//public class PaymentServiceImpl implements com.logihub.logihub.service.PaymentService {
//
//    private final PaymentRepository paymentRepository;
//    private final CustomerRepository customerRepository;
//    private final TransporterRepository transporterRepository;
//    private final ModelMapper mapper;
//
//    public PaymentServiceImpl(PaymentRepository paymentRepository,
//                              CustomerRepository customerRepository,
//                              TransporterRepository transporterRepository,
//                              ModelMapper mapper) {
//        this.paymentRepository = paymentRepository;
//        this.customerRepository = customerRepository;
//        this.transporterRepository = transporterRepository;
//        this.mapper = mapper;
//    }
//
//    @Override
//    public PaymentDTO processPayment(PaymentDTO paymentDTO) {
//        var customer = customerRepository.findById(paymentDTO.getCustomerId())
//                .orElseThrow(() -> new RuntimeException("Customer not found"));
//
//        var transporter = transporterRepository.findById(paymentDTO.getTransporterId())
//                .orElseThrow(() -> new RuntimeException("Transporter not found"));
//
//        // Customer balance check
//        if (customer.getWalletBalance() < paymentDTO.getAmount()) {
//            throw new RuntimeException("Insufficient balance in customer wallet");
//        }
//
//        // Deduct from customer and add to transporter
//        customer.setWalletBalance(customer.getWalletBalance() - paymentDTO.getAmount());
//        transporter.setWalletBalance(transporter.getWalletBalance() + paymentDTO.getAmount());
//
//        customerRepository.save(customer);
//        transporterRepository.save(transporter);
//
//        // Save payment record
//        Payment payment = Payment.builder()
//                .transactionId(UUID.randomUUID().toString())
//                .amount(paymentDTO.getAmount())
//                .type(paymentDTO.getType())
//                .status(PaymentStatus.SUCCESS)
//                .customerId(paymentDTO.getCustomerId())
//                .transporterId(paymentDTO.getTransporterId())
//                .bookingId(paymentDTO.getBookingId())
//                .createdAt(LocalDateTime.now())
//                .build();
//
//        paymentRepository.save(payment);
//
//        return mapper.map(payment, PaymentDTO.class);
//    }
//}
