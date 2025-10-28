package com.logihub.logihub.service;

import com.logihub.logihub.dto.PaymentDTO;

public interface PaymentService {
    PaymentDTO processPayment(PaymentDTO paymentDTO);
}
