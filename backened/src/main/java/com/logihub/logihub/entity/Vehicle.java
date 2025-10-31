package com.logihub.logihub.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.logihub.logihub.enums.VehicalStatus;
import com.logihub.logihub.enums.VehicleModel;
import com.logihub.logihub.enums.VehicleType;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING) // Enum ko DB me string ke form me store karega
    private VehicleType vehicleType;

    @Enumerated(EnumType.STRING)
    private VehicleModel model;

    private String vehicleNumber;
    private Double capacity;

    @Enumerated(EnumType.STRING)
    private VehicalStatus status;

    @ManyToOne
    @JoinColumn(name = "transporter_id", nullable = false)
    @JsonBackReference
    private Transporter transporter;
}
