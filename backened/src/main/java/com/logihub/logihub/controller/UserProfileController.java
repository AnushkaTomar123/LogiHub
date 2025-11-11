package com.logihub.logihub.controller;

import com.logihub.logihub.dto.UserProfileDTO;

import com.logihub.logihub.service.impl.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/profile")
public class UserProfileController {

    @Autowired
    private UserProfileService userProfileService;

    // ✅ Get profile by userId
    @GetMapping("/{userId}")
    public UserProfileDTO getUserProfile(@PathVariable Long userId) {
        return userProfileService.getUserProfileById(userId);
    }

    // ✅ Get profile by email
    @GetMapping("/email/{email}")
    public UserProfileDTO getUserProfileByEmail(@PathVariable String email) {
        return userProfileService.getUserProfileByEmail(email);
    }

    // ✅ Get all user profiles
    @GetMapping("/all")
    public List<UserProfileDTO> getAllProfiles() {
        return userProfileService.getAllUserProfiles();
    }
}
