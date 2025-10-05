package com.logihub.logihub;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class LogihubApplication {

	public static void main(String[] args) {
		SpringApplication.run(LogihubApplication.class, args);
	}

}
