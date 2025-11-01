package com.logihub.logihub.dto;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TypingDto {
    private String roomId;
    private Long senderId;
    private String senderRole;
    private boolean typing;
}
