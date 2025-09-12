package com.logihub.logihub.dto;

import com.logihub.logihub.entity.Role;
import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserDto {
    private String name;
    private String email;
    private String password;
}
