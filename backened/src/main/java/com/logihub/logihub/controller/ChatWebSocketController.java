//package com.logihub.logihub.controller;
//
//import com.logihub.logihub.dto.ChatMessageDto;
//import com.logihub.logihub.dto.TypingDto;
//import com.logihub.logihub.entity.ChatMessage;
//import com.logihub.logihub.service.ChatService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.Payload;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Controller;
//
//import java.util.List;
//
//@Controller
//@RequiredArgsConstructor
//public class ChatWebSocketController {
//
//    private final ChatService chatService;
//    private final SimpMessagingTemplate messagingTemplate;
//
//    // clients send to /app/chat.send
//    @MessageMapping("/chat.send")
//    public void receiveMessage(@Payload ChatMessageDto dto) {
//        ChatMessageDto saved = chatService.saveMessage(dto);
//        // broadcast to topic for the room
//        messagingTemplate.convertAndSend("/topic/rooms/" + saved.getRoomId(), saved);
//        // optionally send to specific user destination:
//        // messagingTemplate.convertAndSendToUser(String.valueOf(saved.getReceiverId()), "/queue/messages", saved);
//    }
//
//    // clients send to /app/chat.typing
//    @MessageMapping("/chat.typing")
//    public void typing(@Payload TypingDto typingDto) {
//        messagingTemplate.convertAndSend("/topic/rooms/" + typingDto.getRoomId() + "/typing", typingDto);
//    }
//}
