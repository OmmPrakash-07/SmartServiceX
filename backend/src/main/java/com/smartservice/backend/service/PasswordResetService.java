package com.smartservice.backend.service;

import com.smartservice.backend.entity.PasswordResetToken;
import com.smartservice.backend.entity.User;
import com.smartservice.backend.repository.PasswordResetTokenRepository;
import com.smartservice.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.HexFormat;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class PasswordResetService {

    private static final Logger logger = LoggerFactory.getLogger(PasswordResetService.class);

    private final UserRepository users;
    private final PasswordResetTokenRepository tokens;
    private final PasswordEncoder encoder;
    private final EmailService emailService;
    private final SecureRandom random = new SecureRandom();

    @Value("${app.frontend-url}")
    private String frontendUrl;

    public PasswordResetService(
            UserRepository users,
            PasswordResetTokenRepository tokens,
            PasswordEncoder encoder,
            EmailService emailService) {
        this.users = users;
        this.tokens = tokens;
        this.encoder = encoder;
        this.emailService = emailService;
    }

    @Transactional
    public void requestReset(String email) {
        users.findByEmailIgnoreCase(email.trim()).ifPresent(user -> {
            String rawToken = generateToken();

            tokens.deleteByUser_Id(user.getId());

            tokens.save(new PasswordResetToken(
                    user,
                    sha256(rawToken),
                    LocalDateTime.now().plusMinutes(15)
            ));

            String resetUrl = frontendUrl
                    + "/reset-password?token=" + rawToken;

            try {
                emailService.sendPasswordResetEmail(user.getEmail(), resetUrl);
            } catch (RuntimeException exception) {
                // Do not expose provider status or account existence to the caller.
                // Remove the undeliverable token so no unusable reset credential remains stored.
                tokens.deleteByUser_Id(user.getId());
                logger.warn("Password reset email delivery failed");
            }
        });
    }

    @Transactional
    public void resetPassword(String rawToken, String newPassword) {
        if (rawToken == null || rawToken.isBlank()) {
            throw new IllegalArgumentException(
                    "Invalid or expired reset link");
        }

        PasswordResetToken token = tokens
                .findUsableTokenForUpdate(
                        sha256(rawToken), LocalDateTime.now())
                .orElseThrow(() -> new IllegalArgumentException(
                        "Invalid or expired reset link"));

        User user = token.getUser();
        user.setPassword(encoder.encode(newPassword));
        user.setTokenVersion(user.getTokenVersion() + 1);

        // Mark used so the same link cannot be reused.
        token.setUsedAt(LocalDateTime.now());
        // Remove other outstanding reset links and make every prior JWT stale.
        tokens.deleteByUser_Id(user.getId());
    }

    private String generateToken() {
        byte[] bytes = new byte[32];
        random.nextBytes(bytes);
        return Base64.getUrlEncoder()
                .withoutPadding().encodeToString(bytes);
    }

    private String sha256(String value) {
        try {
            byte[] hash = MessageDigest.getInstance("SHA-256")
                    .digest(value.getBytes(StandardCharsets.UTF_8));
            return HexFormat.of().formatHex(hash);
        } catch (Exception e) {
            throw new IllegalStateException(e);
        }
    }
}
