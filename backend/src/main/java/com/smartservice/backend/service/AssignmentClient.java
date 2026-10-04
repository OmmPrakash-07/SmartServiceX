package com.smartservice.backend.service;

import com.smartservice.backend.dto.AssignmentResponseDTO;
import com.smartservice.backend.dto.AutoAssignmentRequestDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

@Service
public class AssignmentClient {

    private final RestClient restClient;

    @Value("${assignment.service.url}")
    private String assignmentServiceUrl;

    public AssignmentClient(RestClient restClient) {
        this.restClient = restClient;
    }

    public AssignmentResponseDTO autoAssign(
            Long complaintId,
            String department
    ) {

        AutoAssignmentRequestDTO request =
                new AutoAssignmentRequestDTO(
                        complaintId,
                        department
                );

        return restClient
                .post()
                .uri(assignmentServiceUrl + "/api/assignments/auto")
                .body(request)
                .retrieve()
                .body(AssignmentResponseDTO.class);
    }
}