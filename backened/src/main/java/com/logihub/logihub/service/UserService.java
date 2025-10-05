package com.logihub.logihub.service;

import com.logihub.logihub.dto.AuthResponse;
import com.logihub.logihub.dto.LoginRequest;
import com.logihub.logihub.dto.SignUpRequest;

public interface UserService {
    AuthResponse signup(SignUpRequest signUpRequest);
    AuthResponse login(LoginRequest loginRequest);
}
