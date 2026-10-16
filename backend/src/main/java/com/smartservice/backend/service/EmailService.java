package com.smartservice.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Map;

@Service
public class EmailService {

    private final RestClient restClient;

    @Value("${resend.api-key}")
    private String apiKey;

    @Value("${mail.from}")
    private String from;

    public EmailService(RestClient.Builder builder) {
        this.restClient = builder
                .baseUrl("https://api.resend.com")
                .build();
    }

    public void sendPasswordResetEmail(
            String recipient, String resetUrl) {

        String html = """
            <h2>Reset your SmartServiceX password</h2>
            <p>We received a request to reset your password.</p>
            <p>
              <a href="%s">Reset Password</a>
            </p>
            <p>This link expires in 15 minutes and can only be used once.</p>
            <p>If you did not request this, you can ignore this email.</p>
            """.formatted(resetUrl);

        restClient.post()
                .uri("/emails")
                .header("Authorization", "Bearer " + apiKey)
                .contentType(MediaType.APPLICATION_JSON)
                .body(Map.of(
                        "from", from,
                        "to", new String[]{recipient},
                        "subject", "Reset your SmartServiceX password",
                        "html", html
                ))
                .retrieve()
                .toBodilessEntity();
    }
}