package com.logihub.logihub.controller;

import com.logihub.logihub.dto.VehicleDTO;
import com.logihub.logihub.dto.VehicleResponseDTO;
import com.logihub.logihub.enums.VehicalModel;
import com.logihub.logihub.enums.VehicalType;
import com.logihub.logihub.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    // ✅ Add new vehicle
    @PostMapping("/add")
    public ResponseEntity<VehicleResponseDTO> addVehicle(@RequestBody VehicleDTO vehicleDTO) {
        return ResponseEntity.ok(vehicleService.addVehicle(vehicleDTO));
    }

    // ✅ Get all vehicles
    @GetMapping("/all")
    public ResponseEntity<List<VehicleResponseDTO>> getAllVehicles() {
        return ResponseEntity.ok(vehicleService.getAllVehicles());
    }

    // ✅ Get vehicles by transporter
    @GetMapping("/transporter/{transporterId}")
    public ResponseEntity<List<VehicleResponseDTO>> getVehiclesByTransporter(@PathVariable Long transporterId) {
        return ResponseEntity.ok(vehicleService.getVehiclesByTransporter(transporterId));
    }

    // ✅ Update vehicle
    @PutMapping("/{id}")
    public ResponseEntity<VehicleResponseDTO> updateVehicle(@PathVariable Long id, @RequestBody VehicleDTO vehicleDTO) {
        return ResponseEntity.ok(vehicleService.updateVehicle(id, vehicleDTO));
    }

    // ✅ Delete vehicle
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteVehicle(@PathVariable Long id) {
        vehicleService.deleteVehicle(id);
        return ResponseEntity.ok("Vehicle deleted successfully");
    }
    @GetMapping("/api/vehicle/types")
    public List<String> getVehicleTypes() {
        return Arrays.stream(VehicalType.values())
                .map(Enum::name)
                .toList();
    }
    @GetMapping("/api/vehicle/models")
    public List<String> getVehicleModels() {
        return Arrays.stream(VehicalModel.values())
                .map(Enum::name)
                .toList();
    }

    @GetMapping("/transporter/{transporterId}/status/{status}")
    public ResponseEntity<List<VehicleResponseDTO>> getVehiclesByTransporterAndStatus(
            @PathVariable Long transporterId,
            @PathVariable String status) {

        return ResponseEntity.ok(vehicleService.getVehiclesByTransporterAndStatus(transporterId, status));
    }


}
