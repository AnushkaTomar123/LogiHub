package com.logihub.logihub.controller;


import com.logihub.logihub.dto.ChatMessage;
import com.logihub.logihub.service.impl.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.sendMessage")
    public void sendMessage(@Payload ChatMessage message) {
        message.setTimestamp(java.time.LocalDateTime.now());
        chatService.saveMessage(message);

        messagingTemplate.convertAndSend(
                "/topic/messages/" + message.getReceiverId(),
                message
        );
    }
}
