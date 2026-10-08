package com.smartservice.backend.service;

import com.smartservice.backend.dto.AssignmentResponseDTO;
import com.smartservice.backend.dto.AutoAssignmentRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import java.util.Arrays;
import java.util.List;
import java.util.HashMap;

@Service
public class AssignmentClient {

    private final RestClient restClient;

    @Value("${assignment.service.url}")
    private String assignmentServiceUrl;

    public AssignmentClient(RestClient.Builder builder) {
        this.restClient = builder.build();
    }

    public AssignmentResponseDTO autoAssign(
            Long complaintId,
            String department) {

        AutoAssignmentRequestDTO request =
                new AutoAssignmentRequestDTO(
                        complaintId,
                        department);

        return restClient
                .post()
                .uri(
                        assignmentServiceUrl
                                + "/api/assignments/auto"
                )
                .body(request)
                .retrieve()
                .body(AssignmentResponseDTO.class);
    }

    public AssignmentResponseDTO getAssignmentByComplaintId(
            Long complaintId) {

        return restClient
                .get()
                .uri(
                        assignmentServiceUrl
                                + "/api/assignments/complaint/"
                                + complaintId
                )
                .retrieve()
                .body(AssignmentResponseDTO.class);
    }

    /*
     * Get all assignments from the .NET Assignment Service.
     */
    public List<AssignmentResponseDTO> getAllAssignments() {

        AssignmentResponseDTO[] assignments =
                restClient
                        .get()
                        .uri(
                                assignmentServiceUrl
                                        + "/api/assignments"
                        )
                        .retrieve()
                        .body(AssignmentResponseDTO[].class);

        if (assignments == null) {
            return List.of();
        }

        return Arrays.asList(assignments);
    }

    public AssignmentResponseDTO updateAssignmentStatus(
            Long assignmentId,
            String status
    ) {

        return restClient
                .put()
                .uri(
                        assignmentServiceUrl
                                + "/api/assignments/"
                                + assignmentId
                                + "/status"
                )
                .body(
                        new HashMap<String, String>() {{
                            put("status", status);
                        }}
                )
                .retrieve()
                .body(AssignmentResponseDTO.class);
    }

    public List<AssignmentResponseDTO.EmployeeResponseDTO> getAllEmployees() {

        AssignmentResponseDTO.EmployeeResponseDTO[] employees =
                restClient
                        .get()
                        .uri(assignmentServiceUrl + "/api/employees")
                        .retrieve()
                        .body(AssignmentResponseDTO.EmployeeResponseDTO[].class);

        if (employees == null) {
            return List.of();
        }

        return Arrays.asList(employees);
    }
}