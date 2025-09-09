package com.logihub.logihub.controller;

import com.logihub.logihub.dto.UserDto;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<User> signup(@RequestBody UserDto userDto) {
        return ResponseEntity.ok(userService.signup(userDto));
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserDto userDto) {
        User user = userService.login(userDto.getEmail(), userDto.getPassword());

        String redirectUrl = switch (user.getRole()) {
            case ADMIN -> "/admin/dashboard";
            case AGENT -> "/agent/dashboard";
            case CUSTOMER -> "/customer/dashboard";
        };

        return ResponseEntity.ok(redirectUrl);
    }
}

