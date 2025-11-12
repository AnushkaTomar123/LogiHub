package com.logihub.logihub.controller;


import com.logihub.logihub.service.impl.AIService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
@CrossOrigin("*")
public class AIController {

    @Autowired
    private AIService aiService;

    @PostMapping("/chat")
    public String chatWithAI(@RequestBody String message) {
        return aiService.getAIResponse(message);
    }
}
