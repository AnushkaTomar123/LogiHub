package com.logihub.logihub.controller;


import com.logihub.logihub.dto.ChatMessage;
import com.logihub.logihub.service.impl.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/messages")
@RequiredArgsConstructor
public class MessageController {

    private final ChatService chatService;

    @GetMapping("/{user1}/{user2}")
    public List<ChatMessage> getChatHistory(@PathVariable String user1, @PathVariable String user2) {
        return chatService.getChatHistory(user1, user2);
    }

    @PostMapping("/send")
    public ChatMessage sendMessage(@RequestBody ChatMessage message) {
        return chatService.saveMessage(message);
    }
}
