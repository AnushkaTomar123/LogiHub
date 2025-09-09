package com.logihub.logihub.service;

import com.logihub.logihub.dto.UserDto;
import com.logihub.logihub.entity.User;

public interface UserService {
    User signup(UserDto userDto);
    User login(String email, String password);
}
