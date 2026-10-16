package com.smartservice.backend.service;

import com.smartservice.backend.entity.PasswordResetToken;
import com.smartservice.backend.entity.Role;
import com.smartservice.backend.entity.User;
import com.smartservice.backend.repository.PasswordResetTokenRepository;
import com.smartservice.backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.test.util.ReflectionTestUtils;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDateTime;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class PasswordResetServiceTest {
    private UserRepository users;
    private PasswordResetTokenRepository tokens;
    private PasswordEncoder encoder;
    private EmailService email;
    private PasswordResetService service;

    @BeforeEach
    void setUp() {
        users = mock(UserRepository.class);
        tokens = mock(PasswordResetTokenRepository.class);
        encoder = mock(PasswordEncoder.class);
        email = mock(EmailService.class);
        service = new PasswordResetService(users, tokens, encoder, email);
        ReflectionTestUtils.setField(service, "frontendUrl", "https://app.example.test");
    }

    @Test
    void unknownEmailIsNoOp() {
        when(users.findByEmail("missing@example.test")).thenReturn(Optional.empty());
        assertDoesNotThrow(() -> service.requestReset("missing@example.test"));
        verifyNoInteractions(tokens, email);
    }

    @Test
    void emailProviderFailureDoesNotEscapeOrKeepResetToken() {
        User user = new User("Test", "person@example.test", "old", Role.USER);
        user.setId(10L);
        when(users.findByEmailIgnoreCase(user.getEmail())).thenReturn(Optional.of(user));
        doThrow(new RuntimeException("provider details must not leak"))
                .when(email).sendPasswordResetEmail(eq(user.getEmail()), anyString());

        assertDoesNotThrow(() -> service.requestReset(user.getEmail()));
        verify(tokens, times(2)).deleteByUser_Id(10L);
    }

    @Test
    void successfulResetHashesPasswordAndConsumesToken() {
        User user = new User("Test", "person@example.test", "old", Role.USER);
        PasswordResetToken token = new PasswordResetToken(user, "hash", LocalDateTime.now().plusMinutes(5));
        when(tokens.findUsableTokenForUpdate(anyString(), any()))
                .thenReturn(Optional.of(token));
        when(encoder.encode("NewSecurePassword!123")).thenReturn("encoded-value");

        service.resetPassword("raw-secret-token", "NewSecurePassword!123");

        assertEquals("encoded-value", user.getPassword());
        assertEquals(1L, user.getTokenVersion());
        assertNotNull(token.getUsedAt());
        verify(tokens).deleteByUser_Id(user.getId());
    }

    @Test
    void expiredOrReusedTokenIsRejected() {
        when(tokens.findUsableTokenForUpdate(anyString(), any()))
                .thenReturn(Optional.empty());
        assertThrows(IllegalArgumentException.class,
                () -> service.resetPassword("expired-or-used", "NewSecurePassword!123"));
    }

    @Test
    void blankTokenIsRejected() {
        assertThrows(IllegalArgumentException.class,
                () -> service.resetPassword(" ", "NewSecurePassword!123"));
    }
}
