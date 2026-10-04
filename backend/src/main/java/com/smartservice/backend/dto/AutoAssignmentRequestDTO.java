package com.smartservice.backend.dto;

public class AutoAssignmentRequestDTO {

    private Long complaintId;
    private String department;

    public AutoAssignmentRequestDTO() {
    }

    public AutoAssignmentRequestDTO(Long complaintId, String department) {
        this.complaintId = complaintId;
        this.department = department;
    }

    public Long getComplaintId() {
        return complaintId;
    }

    public void setComplaintId(Long complaintId) {
        this.complaintId = complaintId;
    }

    public String getDepartment() {
        return department;
    }

    public void setDepartment(String department) {
        this.department = department;
    }
}