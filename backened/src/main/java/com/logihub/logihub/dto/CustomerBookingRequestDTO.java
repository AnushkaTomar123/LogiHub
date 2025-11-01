package com.logihub.logihub.dto;

import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.enums.VehicalType;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerBookingRequestDTO {
    private Long customerId;
    private String pickupAddress;
    private String dropAddress;
    private String expectDeliveryDate;
    private String goodsDescription;
    private Double estimatedCost;
    private VehicalType vehicalType;
    private BookingStatus bookingStatus;


}
