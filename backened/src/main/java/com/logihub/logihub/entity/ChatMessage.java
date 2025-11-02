package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "chat_messages", indexes = {@Index(columnList = "roomId"), @Index(columnList = "timestamp")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatMessage {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String roomId;
    private Long senderId;
    private Long receiverId;
    private String senderRole; // CUSTOMER / TRANSPORTER / DRIVER

    @Column(columnDefinition = "TEXT")
    private String message;

    private LocalDateTime timestamp;
    private boolean seen;
}
