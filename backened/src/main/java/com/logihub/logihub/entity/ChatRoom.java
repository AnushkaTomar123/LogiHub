package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "chat_rooms", indexes = {@Index(columnList = "roomId")})
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String roomId;        // e.g., room_2_5

    private Long participantA;    // numeric id (customer/driver/transporter)
    private Long participantB;
}
