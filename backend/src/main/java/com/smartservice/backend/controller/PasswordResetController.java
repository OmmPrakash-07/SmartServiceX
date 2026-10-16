package com.smartservice.backend.controller;

import com.smartservice.backend.service.PasswordResetService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class PasswordResetController {

    private final PasswordResetService service;

    public PasswordResetController(PasswordResetService service) {
        this.service = service;
    }

    public record ForgotRequest(
            @NotBlank @Email @Size(max = 254) String email) {}

    public record ResetRequest(
            @NotBlank String token,
            @NotBlank @Size(min = 12, max = 72) String newPassword) {}

    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgot(
            @Valid @RequestBody ForgotRequest request) {

        service.requestReset(request.email());

        return ResponseEntity.ok().body(
                java.util.Map.of(
                        "message",
                        "If that email is registered, a reset link will be sent."
                )
        );
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> reset(
            @Valid @RequestBody ResetRequest request) {

        service.resetPassword(
                request.token(), request.newPassword());

        return ResponseEntity.ok().body(
                java.util.Map.of(
                        "message",
                        "Password reset successfully. Please log in."
                )
        );
    }
}
