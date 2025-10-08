package com.logihub.logihub.entity;

import jakarta.persistence.*;
import lombok.*;

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

    @OneToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String companyName;
    private String vehicleNo;
    private String licenseNo;
    private String aadhaarNo; // fixed naming convention
}
