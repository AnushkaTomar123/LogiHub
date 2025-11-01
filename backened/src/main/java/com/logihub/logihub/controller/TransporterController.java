package com.logihub.logihub.controller;

import com.logihub.logihub.dto.TransporterDTO;
import com.logihub.logihub.entity.Transporter;
import com.logihub.logihub.service.TransporterService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transporters")
@RequiredArgsConstructor
public class TransporterController {

    private final TransporterService transporterService;

    // Create Transporter (multipart form)
    @PostMapping(consumes = {"multipart/form-data"})
    public ResponseEntity<Transporter> createTransporter(@Valid  @ModelAttribute TransporterDTO dto) {
        Transporter savedTransporter = transporterService.createTransporter(dto);
        return ResponseEntity.ok(savedTransporter);
    }

    // Update Transporter
    @PutMapping(value = "/{id}", consumes = {"multipart/form-data"})
    public ResponseEntity<Transporter> updateTransporter(@Valid
            @PathVariable Long id, @ModelAttribute TransporterDTO dto) {
        Transporter updated = transporterService.updateTransporter(id, dto);
        return ResponseEntity.ok(updated);
    }

    @GetMapping
    public ResponseEntity<List<Transporter>> getAllTransporters() {
        return ResponseEntity.ok(transporterService.getAllTransporters());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Transporter> getTransporterById(@PathVariable Long id) {
        return transporterService.getTransporterById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTransporter(@PathVariable Long id) {
        transporterService.deleteTransporter(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/by-email")
    public ResponseEntity<Transporter> getTransporterByUserEmail(@RequestParam String email) {
        return transporterService.getTransporterByUserEmail(email)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
