package com.ipca.auth.service;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.ipca.auth.dto.AuthRequest;


@Service
public class AuthService {

    private static final String REQUIRED_DOMAIN = "@ipca.com";

    // Static in-memory users
    private final Map<String, String> users = new HashMap<>();

    public AuthService() {
        // Using usernames (part before @ipca.com) as keys
        users.put("ananya.parabat", "ananya@123");
        users.put("ruchita.saroj", "ruchita@123");
        users.put("user3", "user3@123");
        users.put("user4", "user4@123");
    }

    public AuthResult authenticate(AuthRequest request) {
        String fullDomainId = request.getDomainId();

        if (!fullDomainId.endsWith(REQUIRED_DOMAIN)) {
            return new AuthResult(false, "Invalid Domain");
        }
        String password = users.get(fullDomainId.substring(0, fullDomainId.length() - REQUIRED_DOMAIN.length()));

        if (password != null && password.equals(request.getPassword())) {
            return new AuthResult(true, "Login Successful");
        }

        return new AuthResult(false, "Invalid Credentials");
    }

    // Record class
    public record AuthResult(boolean authenticated, String message) {
    }
}
