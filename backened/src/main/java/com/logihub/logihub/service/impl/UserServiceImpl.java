package com.logihub.logihub.service.impl;

import com.logihub.logihub.dto.AuthResponse;
import com.logihub.logihub.dto.LoginRequest;
import com.logihub.logihub.dto.LoginResponse;
import com.logihub.logihub.dto.SignUpRequest;
import com.logihub.logihub.entity.User;
import com.logihub.logihub.repository.UserRepository;
import com.logihub.logihub.service.UserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public AuthResponse signup(SignUpRequest request) {
        if(userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(null,"Username already exists"  );
        }
        if(userRepository.existsByEmail(request.getEmail())) {
            return new AuthResponse(null,"Email already exists");
        }

        User user = modelMapper.map(request, User.class);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        return new AuthResponse(user.getRole(),"User registered successfully" );
    }


    @Override
    public LoginResponse login(LoginRequest request) {
        User user = userRepository.findByUsername(request.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));
        if(passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            return new LoginResponse("Login successful" , user.getRole() , user.getUsername(),user.getEmail());
        } else {
            return new LoginResponse("Invalid credentials" , null,null,null);
        }
    }
}

