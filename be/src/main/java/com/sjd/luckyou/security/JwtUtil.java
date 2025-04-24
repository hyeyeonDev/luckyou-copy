package com.sjd.luckyou.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.UUID;

@Component
public class JwtUtil {
    
    private final String jwtSecret;

    @Autowired
    public JwtUtil(@Value("${spring.security.jwt.secret}") String jwtSecret) {
        this.jwtSecret = jwtSecret;
    }

    private Key getKey() {
        return new SecretKeySpec(jwtSecret.getBytes(), SignatureAlgorithm.HS256.getJcaName());
    }

    String extractToken(HttpServletRequest request) {
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7); // "Bearer "를 제외한 토큰 반환
        }
        return null;
    }

    Claims claimsJws(String token) {
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1].trim();
        }
        return Jwts.parserBuilder().setSigningKey(getKey())
                .build().parseClaimsJws(token).getBody();
    }

    public UUID getUserIdFromToken(String token) {
        try {
            Claims claims = claimsJws(token);
            String userId = claims.get("sub", String.class).replace("Bearer ", "");
            return UUID.fromString(userId);
        } catch (Exception e) {
            throw new RuntimeException("Invalid or expired token: " + e.getMessage());
        }
    }

    boolean validateToken(String token) {
        try {
            claimsJws(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
