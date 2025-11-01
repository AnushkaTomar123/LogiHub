package com.logihub.logihub.config;

import org.json.JSONArray;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class GeoCodingService {

    @Value("${opencage.api.key}")
    private String apiKey;

    /**
     * Get latitude and longitude for a location name using OpenCage API
     * @param location Location name (e.g., "Malviya Nagar Jaipur")
     * @return double array [lat, lon]
     */
    public double[] getLatLon(String location) {
        try {
            String url = "https://api.opencagedata.com/geocode/v1/json?q="
                    + location.replace(" ", "%20") + "&key=" + apiKey + "&limit=1";

            RestTemplate restTemplate = new RestTemplate();
            String response = restTemplate.getForObject(url, String.class);

            JSONObject json = new JSONObject(response);
            JSONArray results = json.getJSONArray("results");

            if (results.length() == 0) {
                throw new RuntimeException("Location not found: " + location);
            }

            JSONObject geometry = results.getJSONObject(0).getJSONObject("geometry");
            double lat = geometry.getDouble("lat");
            double lon = geometry.getDouble("lng");

            return new double[]{lat, lon};
        } catch (Exception e) {
            throw new RuntimeException("Error fetching coordinates: " + e.getMessage());
        }
    }
}
