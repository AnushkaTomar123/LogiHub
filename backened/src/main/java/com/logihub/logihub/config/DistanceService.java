package com.logihub.logihub.config;

import lombok.RequiredArgsConstructor;
import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
public class DistanceService {

    @Value("${openroute.api.key}")
    private String apiKey;

    /**
     * Calculate driving distance in km between two coordinates using OpenRouteService
     * @param fromLat Latitude of starting point
     * @param fromLon Longitude of starting point
     * @param toLat Latitude of destination
     * @param toLon Longitude of destination
     * @return distance in kilometers
     */
    public double getDistanceInKm(double fromLat, double fromLon, double toLat, double toLon) {
        try {
            String url = "https://api.openrouteservice.org/v2/directions/driving-car?api_key="
                    + apiKey + "&start=" + fromLon + "," + fromLat + "&end=" + toLon + "," + toLat;

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            JSONArray segments = json.getJSONArray("features")
                    .getJSONObject(0)
                    .getJSONObject("properties")
                    .getJSONArray("segments");

            double meters = segments.getJSONObject(0).getDouble("distance");
            return meters / 1000; // convert meters → km
        } catch (Exception e) {
            throw new RuntimeException("Error calling OpenRouteService API: " + e.getMessage());
        }
    }
}
