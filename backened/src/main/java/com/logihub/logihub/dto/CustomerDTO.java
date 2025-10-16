package com.logihub.logihub.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CustomerDTO {

    private String userEmail;     // to auto fetch User from email
    private String contactNo;
    private String address;
    private String city;
    private MultipartFile profilePhoto;
}
