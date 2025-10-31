//package com.logihub.logihub.config;
//
//import com.fasterxml.jackson.databind.JsonNode;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//
//@Service
//public class HuggingFaceService {
//
//
//    @Value("${huggingface.api.key}")
//    private String apiKey;
//
//    private static final String MODEL_URL = "https://api-inference.huggingface.co/models/gpt2";
//
//    public String ask(String userMessage) {
//        RestTemplate restTemplate = new RestTemplate();
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(apiKey);
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        String body = "{ \"inputs\": \"" + userMessage + "\" }";
//        HttpEntity<String> request = new HttpEntity<>(body, headers);
//
//        try {
//            ResponseEntity<String> response = restTemplate.exchange(
//                    MODEL_URL, HttpMethod.POST, request, String.class);
//
//            ObjectMapper mapper = new ObjectMapper();
//            JsonNode root = mapper.readTree(response.getBody());
//
//            // Extract text response
//            if (root.isArray() && root.size() > 0 && root.get(0).has("generated_text")) {
//                return root.get(0).get("generated_text").asText();
//            }
//            return "No response text found.";
//        } catch (Exception e) {
//            return "Error: " + e.getMessage();
//        }
//    }
//
//
//}
