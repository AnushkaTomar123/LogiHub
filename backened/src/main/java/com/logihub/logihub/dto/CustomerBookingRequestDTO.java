package com.logihub.logihub.dto;

import com.logihub.logihub.enums.BookingStatus;
import com.logihub.logihub.enums.VehicalType;
import jakarta.validation.constraints.*;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerBookingRequestDTO {
    @NotNull(message = "Customer ID is required")
    private Long customerId;
    @NotBlank(message = "Pickup address cannot be blank")
    @Size(min = 5, max = 255, message = "Pickup address must be between 5 and 255 characters")
    private String pickupAddress;
    @NotBlank(message = "Drop address cannot be blank")
    @Size(min = 5, max = 255, message = "Drop address must be between 5 and 255 characters")
    private String dropAddress;
    @FutureOrPresent(message = "Delivery date must be today or in the future")
    private String expectDeliveryDate;
    private String goodsDescription;
    @Positive(message = "Estimated cost must be positive")
    private Double estimatedCost;
    private VehicalType vehicalType;
    @NotNull(message = "Booking status is required")
    private BookingStatus bookingStatus;


}
