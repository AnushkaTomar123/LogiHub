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
public class Driver {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String driverName;
    private String licenseNumber;
    private String phoneNumber;
//    private String aadhaarCardUrl;
    @ManyToOne
    @JoinColumn(name = "transporter_id", nullable = false)
    @JsonBackReference
    private Transporter transporter;

}