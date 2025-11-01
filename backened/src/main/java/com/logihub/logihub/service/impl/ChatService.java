package com.logihub.logihub.service.impl;


import com.logihub.logihub.dto.ChatMessage;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class ChatService {
    private final List<ChatMessage> messages = new ArrayList<>();

    public ChatMessage saveMessage(ChatMessage message) {
        messages.add(message);
        return message;
    }

    public List<ChatMessage> getChatHistory(String user1, String user2) {
        return messages.stream()
                .filter(msg ->
                        (msg.getSenderId().equals(user1) && msg.getReceiverId().equals(user2)) ||
                                (msg.getSenderId().equals(user2) && msg.getReceiverId().equals(user1)))
                .toList();
    }
}
