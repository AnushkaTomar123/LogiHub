package com.logihub.logihub.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.logihub.logihub.enums.DriverStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String driverName;
    @Column(nullable = false, unique = true)
    private String licenseNumber;
    @Column(nullable = false, unique = true)
    private String phoneNumber;
//    private String aadhaarCardUrl;
    @Enumerated(EnumType.STRING)
    private DriverStatus status;

    @ManyToOne
    @JoinColumn(name = "transporter_id", nullable = false)
    @JsonBackReference
    private Transporter transporter;

}