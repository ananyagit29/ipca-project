package com.ipca.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ipca.auth.dto.AuthRequest;
import com.ipca.auth.service.AuthService;
import com.ipca.auth.service.AuthService.AuthResult;

@RestController
@RequestMapping("/api/auth/login")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AuthRequest request) {

        AuthResult result = authService.authenticate(request);

        if (result.authenticated()) {
            return ResponseEntity.ok(result.message());
        }

        return ResponseEntity
        .status(HttpStatus.UNAUTHORIZED)
        .body(result.message());
    }
}
