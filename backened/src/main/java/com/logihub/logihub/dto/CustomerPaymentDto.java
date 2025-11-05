package com.logihub.logihub.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerPaymentDto {

    private Long bookingId;
  //  private Double amountPaid;
    private String paymentMode;
    private LocalDateTime paymentTime;
}
