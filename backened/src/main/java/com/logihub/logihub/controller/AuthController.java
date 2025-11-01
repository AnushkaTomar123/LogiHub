package com.logihub.logihub.controller;

import com.logihub.logihub.dto.AuthResponse;
import com.logihub.logihub.dto.LoginRequest;
import com.logihub.logihub.dto.LoginResponse;
import com.logihub.logihub.dto.SignUpRequest;
import com.logihub.logihub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService authService;

    @PostMapping("/signup")
    public AuthResponse signup(@Valid @RequestBody SignUpRequest request){
        return authService.signup(request);
    }

    @PostMapping("/login")
    public LoginResponse login( @Valid @RequestBody LoginRequest request){
        return authService.login(request);
    }
}

