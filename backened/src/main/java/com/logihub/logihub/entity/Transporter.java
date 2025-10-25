package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "transporters")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Transporter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false)
    private String companyName;

    @Column(nullable = false)
    private String contactPersonName;

    @Column(nullable = false, length = 15)
    private String contactNumber;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String address;

    @Column(nullable = false, length = 10)
    private String panNumber;

    @Column(nullable = false, length = 12)
    private String aadhaarNumber;

    @Column(nullable = false)
    private Integer totalVehicles;

    @Column(nullable = true)
    private String vehicleTypes;

    // Store files as binary data (BLOB)
    @Column(nullable = true)
    private String profilePhotoUrl;

    @Column(nullable = true)
    private String rcProofDocumentUrl;
//    @Column(nullable = false)
//    private Boolean verified = false;
//
//    @Column(nullable = false)
//    private Boolean active = true;

    @OneToMany(mappedBy = "transporter", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Driver> drivers = new ArrayList<>();
}
