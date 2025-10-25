package com.logihub.logihub.dto;

import lombok.*;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class CustomerDTO {

    private String userEmail;
    private String contactNo;
    private String address;
    private String city;
    private MultipartFile profilePhoto;
}
