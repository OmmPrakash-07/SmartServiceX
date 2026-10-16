package com.smartservice.backend.repository;

import com.smartservice.backend.entity.PasswordResetToken;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import jakarta.persistence.LockModeType;

import java.time.LocalDateTime;
import java.util.Optional;

public interface PasswordResetTokenRepository
        extends JpaRepository<PasswordResetToken, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select t from PasswordResetToken t where t.tokenHash = :tokenHash and t.usedAt is null and t.expiresAt > :now")
    Optional<PasswordResetToken> findUsableTokenForUpdate(
            @Param("tokenHash") String tokenHash, @Param("now") LocalDateTime now);

    void deleteByUser_Id(Long userId);
}
