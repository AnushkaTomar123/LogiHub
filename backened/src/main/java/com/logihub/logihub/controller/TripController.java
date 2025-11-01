package com.logihub.logihub.controller;

import com.logihub.logihub.dto.TripRequestDTO;
import com.logihub.logihub.dto.TripResponseDTO;
import com.logihub.logihub.service.impl.TripService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/trips")
@RequiredArgsConstructor
public class TripController {

    private final TripService tripService;

    @PostMapping("/create")
    public TripResponseDTO createTrip(@Valid @RequestBody TripRequestDTO dto) {
        return tripService.createTrip(dto);
    }
}
