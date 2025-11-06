package com.logihub.logihub.controller;

import com.logihub.logihub.dto.AuthResponse;
import com.logihub.logihub.dto.LoginRequest;
import com.logihub.logihub.dto.LoginResponse;
import com.logihub.logihub.dto.SignUpRequest;
import com.logihub.logihub.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final UserService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@Valid @RequestBody SignUpRequest request) {
        AuthResponse response = authService.signup(request);
        return new ResponseEntity<>(response, HttpStatus.CREATED); // 201
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@Valid @RequestBody LoginRequest request) {
        LoginResponse response = authService.login(request);
        return new ResponseEntity<>(response, HttpStatus.OK); // 200
    }
}
