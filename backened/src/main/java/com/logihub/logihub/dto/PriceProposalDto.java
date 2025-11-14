package com.logihub.logihub.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PriceProposalDto {
    private Long bookingId;
    private Long userId;
    private Boolean isCustomerProposed;
    private Double proposedPrice;
}
