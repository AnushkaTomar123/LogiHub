//package com.logihub.logihub.config;
//
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.RestTemplate;
//import org.springframework.web.util.UriComponentsBuilder;
//
//import java.util.HashMap;
//import java.util.Map;
//
//@Service
//public class OpenAIService {
//
//    @Value("${huggingface.api.key}")
//    private String apiKey;
//
//    private final RestTemplate restTemplate = new RestTemplate();
//
//    public String ask(String message) {
//        try {
//            String url = "https://api-inference.huggingface.co/models/gpt2"; // ✅ existing working model
//
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.setBearerAuth(apiKey);
//
//            Map<String, Object> body = new HashMap<>();
//            body.put("inputs", message);
//
//            HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
//            ResponseEntity<String> response = restTemplate.exchange(
//                    UriComponentsBuilder.fromHttpUrl(url).toUriString(),
//                    HttpMethod.POST,
//                    entity,
//                    String.class
//            );
//
//            return response.getBody();
//        } catch (Exception e) {
//            e.printStackTrace();
//            return "Error: " + e.getMessage();
//        }
//    }
//}
