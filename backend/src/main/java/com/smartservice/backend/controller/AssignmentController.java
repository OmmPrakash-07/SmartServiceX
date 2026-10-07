package com.smartservice.backend.controller;

import com.smartservice.backend.dto.AssignmentResponseDTO;
import com.smartservice.backend.entity.ComplaintStatus;
import com.smartservice.backend.service.AssignmentClient;
import com.smartservice.backend.service.ComplaintService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
public class AssignmentController {

    private final AssignmentClient assignmentClient;
    private final ComplaintService complaintService;

    public AssignmentController(
            AssignmentClient assignmentClient,
            ComplaintService complaintService
    ) {
        this.assignmentClient = assignmentClient;
        this.complaintService = complaintService;
    }

    @GetMapping
    public ResponseEntity<List<AssignmentResponseDTO>> getAllAssignments() {

        return ResponseEntity.ok(
                assignmentClient.getAllAssignments()
        );
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<AssignmentResponseDTO> updateAssignmentStatus(
            @PathVariable Long id,
            @RequestBody java.util.Map<String, String> request
    ) {

        String status = request.get("status");

        AssignmentResponseDTO updatedAssignment =
                assignmentClient.updateAssignmentStatus(
                        id,
                        status
                );

        if ("IN_PROGRESS".equalsIgnoreCase(status)) {

            complaintService.updateStatus(
                    updatedAssignment.getComplaintId(),
                    ComplaintStatus.IN_PROGRESS
            );

        } else if ("COMPLETED".equalsIgnoreCase(status)) {

            complaintService.updateStatus(
                    updatedAssignment.getComplaintId(),
                    ComplaintStatus.RESOLVED
            );
        }

        return ResponseEntity.ok(updatedAssignment);
    }
}