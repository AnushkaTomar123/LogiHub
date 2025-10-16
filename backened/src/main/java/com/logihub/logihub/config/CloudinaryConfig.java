package com.logihub.logihub.config;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CloudinaryConfig {

    @Bean
    public Cloudinary cloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", "dkumngxrb",
                "api_key", "994862978223524",
                "api_secret", "BW8b5N3vVgWoA2ldEF-QmhWCG1s"
        ));
    }
}
