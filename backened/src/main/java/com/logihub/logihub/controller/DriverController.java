package com.logihub.logihub.controller;

import com.logihub.logihub.dto.DriverDTO;
import com.logihub.logihub.service.DriverService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/drivers")
public class DriverController {

    @Autowired
    private DriverService driverService;

    // ✅ Add Driver
    @PostMapping("/add")
    public ResponseEntity<DriverDTO> addDriver(@RequestBody DriverDTO driverDTO) {
        return ResponseEntity.ok(driverService.addDriver(driverDTO));
    }

    // ✅ Get All Drivers
    @GetMapping("/all")
    public ResponseEntity<List<DriverDTO>> getAllDrivers() {
        return ResponseEntity.ok(driverService.getAllDrivers());
    }

    // ✅ Get Drivers by Transporter
    @GetMapping("/transporter/{transporterId}")
    public ResponseEntity<List<DriverDTO>> getDriversByTransporter(@PathVariable Long transporterId) {
        return ResponseEntity.ok(driverService.getDriversByTransporter(transporterId));
    }

    // ✅ Update Driver
    @PutMapping("/{id}")
    public ResponseEntity<DriverDTO> updateDriver(@PathVariable Long id, @RequestBody DriverDTO driverDTO) {
        return ResponseEntity.ok(driverService.updateDriver(id, driverDTO));
    }

    // ✅ Delete Driver
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteDriver(@PathVariable Long id) {
        driverService.deleteDriver(id);
        return ResponseEntity.ok("Driver deleted successfully");
    }
}
