package com.smartservice.backend.dto;

import com.smartservice.backend.entity.ComplaintStatus;
import jakarta.validation.constraints.NotNull;

public class ComplaintStatusUpdateRequestDTO {

    @NotNull(message = "Status is required")
    private ComplaintStatus status;

    public ComplaintStatusUpdateRequestDTO() {
    }

    public ComplaintStatus getStatus() {
        return status;
    }

    public void setStatus(ComplaintStatus status) {
        this.status = status;
    }
}