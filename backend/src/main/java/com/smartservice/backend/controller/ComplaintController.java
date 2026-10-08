package com.smartservice.backend.controller;

import com.smartservice.backend.dto.AssignmentResponseDTO;
import com.smartservice.backend.dto.ComplaintCreateRequestDTO;
import com.smartservice.backend.dto.ComplaintResponseDTO;
import com.smartservice.backend.dto.ComplaintStatusUpdateRequestDTO;
import com.smartservice.backend.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

        private final ComplaintService complaintService;

        public ComplaintController(ComplaintService complaintService) {
                this.complaintService = complaintService;
        }

        @PostMapping
        @PreAuthorize("hasAnyRole('USER', 'EMPLOYEE', 'ADMIN')")
        public ResponseEntity<ComplaintResponseDTO> createComplaint(
                        @RequestParam Long userId,
                        @Valid @RequestBody ComplaintCreateRequestDTO request) {

                ComplaintResponseDTO createdComplaint =
                                complaintService.createComplaint(
                                                request,
                                                userId);

                return ResponseEntity
                                .status(HttpStatus.CREATED)
                                .body(createdComplaint);
        }

        @GetMapping
        @PreAuthorize("hasRole('ADMIN')")
        public ResponseEntity<List<ComplaintResponseDTO>> getAllComplaints() {

                return ResponseEntity.ok(
                                complaintService.getAllComplaints());
        }

        @GetMapping("/{id}")
        public ResponseEntity<ComplaintResponseDTO> getComplaintById(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                complaintService.getComplaintById(id));
        }

        /*
         * Get assignment details for a complaint.
         *
         * React calls the Java backend instead of
         * directly calling the C# Assignment Service.
         */
        @GetMapping("/{id}/assignment")
        public ResponseEntity<AssignmentResponseDTO> getAssignmentByComplaintId(
                        @PathVariable Long id) {

                return ResponseEntity.ok(
                                complaintService.getAssignmentByComplaintId(id));
        }

        @GetMapping("/user/{userId}")
        public ResponseEntity<List<ComplaintResponseDTO>> getComplaintsByUser(
                        @PathVariable Long userId) {

                return ResponseEntity.ok(
                                complaintService.getComplaintsByUser(userId));
        }

        @PutMapping("/{id}/status")
        public ResponseEntity<ComplaintResponseDTO> updateStatus(
                        @PathVariable Long id,
                        @Valid @RequestBody ComplaintStatusUpdateRequestDTO request) {

                System.out.println(
                                "UPDATE STATUS ENDPOINT REACHED - complaintId=" + id);

                return ResponseEntity.ok(
                                complaintService.updateStatus(
                                                id,
                                                request.getStatus()));
        }

        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteComplaint(
                        @PathVariable Long id) {

                complaintService.deleteComplaint(id);

                return ResponseEntity.noContent().build();
        }
}