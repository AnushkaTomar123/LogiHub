package com.logihub.logihub.controller;

import com.logihub.logihub.dto.DriverDTO;
import com.logihub.logihub.dto.DriverResponseDTO;
import com.logihub.logihub.service.DriverService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transporters/drivers")
@RequiredArgsConstructor
public class DriverController {

    private final DriverService driverService;

    // ✅ Add Driver
    @PostMapping
    public ResponseEntity<DriverResponseDTO> addDriver(@Valid @RequestBody DriverDTO driverDTO) {
        DriverResponseDTO savedDriver = driverService.addDriver(driverDTO);
        return ResponseEntity.status(201).body(savedDriver); // 201 CREATED
    }

    // ✅ Get All Drivers
    @GetMapping
    public ResponseEntity<List<DriverResponseDTO>> getAllDrivers() {
        List<DriverResponseDTO> drivers = driverService.getAllDrivers();
        return ResponseEntity.ok(drivers); // 200 OK
    }

    // ✅ Get Drivers by Transporter
    @GetMapping("/transporter/{transporterId}")
    public ResponseEntity<List<DriverResponseDTO>> getDriversByTransporter(@PathVariable Long transporterId) {
        List<DriverResponseDTO> drivers = driverService.getDriversByTransporter(transporterId);
        return ResponseEntity.ok(drivers); // 200 OK
    }

    // ✅ Update Driver
    @PutMapping("/{id}")
    public ResponseEntity<DriverResponseDTO> updateDriver(@PathVariable Long id,
                                                          @Valid @RequestBody DriverDTO driverDTO) {
        DriverResponseDTO updatedDriver = driverService.updateDriver(id, driverDTO);
        return ResponseEntity.ok(updatedDriver); // 200 OK
    }

    // ✅ Delete Driver
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.noContent().build(); // 204 No Content
    }
}