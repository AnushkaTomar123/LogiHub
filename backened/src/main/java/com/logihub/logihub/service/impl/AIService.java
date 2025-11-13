package com.logihub.logihub.service.impl;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AIService {

    @Value("${huggingface.api.url}")
    private String apiUrl;

    @Value("${huggingface.api.token}")
    private String apiToken;

    public String getAIResponse(String userMessage) {
        try {
            RestTemplate restTemplate = new RestTemplate();

            JSONObject payload = new JSONObject();
            payload.put("inputs", userMessage);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(apiToken);

            HttpEntity<String> request = new HttpEntity<>(payload.toString(), headers);

            ResponseEntity<String> response = restTemplate.postForEntity(apiUrl, request, String.class);

            String body = response.getBody();

            // Handle JSON response from router
            if (body != null && body.startsWith("[")) {
                JSONArray arr = new JSONArray(body);
                JSONObject obj = arr.getJSONObject(0);
                return obj.optString("generated_text", "No response.");
            }

            JSONObject obj = new JSONObject(body);
            return obj.optString("generated_text", "No text generated.");

        } catch (Exception e) {
            return "Error: " + e.getMessage();
        }
    }
}
