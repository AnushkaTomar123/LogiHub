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
    public ResponseEntity<User> login(@RequestBody UserDto userDto) {
        User user = userService.login(userDto.getEmail(), userDto.getPassword());
        return  ResponseEntity.ok(user);
    }
}

