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

    @OneToOne
    @JoinColumn(name = "user_id")
    private User user;

    private String companyName;
    private String vehicleNo;
    private String licenseNo;
}
