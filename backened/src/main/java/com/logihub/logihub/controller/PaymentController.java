//package com.logihub.logihub.controller;
//
//import com.logihub.logihub.dto.PaymentDTO;
//import com.logihub.logihub.service.PaymentService;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/payments")
//public class PaymentController {
//
//    private final PaymentService paymentService;
//
//    public PaymentController(PaymentService paymentService) {
//        this.paymentService = paymentService;
//    }
//
//    @PostMapping("/process")
//    public ResponseEntity<PaymentDTO> processPayment(@RequestBody PaymentDTO paymentDTO) {
//        PaymentDTO result = paymentService.processPayment(paymentDTO);
//        return ResponseEntity.ok(result);
//    }
//}
