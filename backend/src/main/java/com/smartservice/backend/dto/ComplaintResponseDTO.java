package com.smartservice.backend.dto;

import com.smartservice.backend.entity.ComplaintStatus;
import com.smartservice.backend.entity.Priority;

import java.time.LocalDateTime;

public class ComplaintResponseDTO {

    private Long id;
    private String title;
    private String description;
    private String category;
    private Priority priority;
    private ComplaintStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private UserResponseDTO user;

    public ComplaintResponseDTO() {
    }

    public ComplaintResponseDTO(
            Long id,
            String title,
            String description,
            String category,
            Priority priority,
            ComplaintStatus status,
            LocalDateTime createdAt,
            LocalDateTime updatedAt,
            UserResponseDTO user
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.category = category;
        this.priority = priority;
        this.status = status;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public String getCategory() {
        return category;
    }

    public Priority getPriority() {
        return priority;
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public UserResponseDTO getUser() {
        return user;
    }
}