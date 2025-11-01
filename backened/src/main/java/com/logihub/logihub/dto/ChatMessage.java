package com.logihub.logihub.dto;

import lombok.*;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    private String senderId;
    private String receiverId;
    private String senderType;    // CUSTOMER, DRIVER, TRANSPORTER
    private String receiverType;  // CUSTOMER, DRIVER, TRANSPORTER
    private String content;
    private LocalDateTime timestamp;
}
