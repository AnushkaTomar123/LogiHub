package com.logihub.logihub.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
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

    private String vehicleNumber;
    private String vehicleType;
    private String model;
    @ManyToOne
    @JoinColumn(name = "transporter_id", nullable = false)
    @JsonBackReference
    private Transporter transporter;
}
