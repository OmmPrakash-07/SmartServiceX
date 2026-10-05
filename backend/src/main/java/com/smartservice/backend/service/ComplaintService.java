package com.smartservice.backend.service;

import com.smartservice.backend.dto.ComplaintClassificationResponseDTO;
import com.smartservice.backend.dto.ComplaintCreateRequestDTO;
import com.smartservice.backend.dto.ComplaintResponseDTO;
import com.smartservice.backend.dto.UserResponseDTO;
import com.smartservice.backend.entity.Complaint;
import com.smartservice.backend.entity.ComplaintStatus;
import com.smartservice.backend.entity.Priority;
import com.smartservice.backend.entity.User;
import com.smartservice.backend.repository.ComplaintRepository;
import com.smartservice.backend.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final UserRepository userRepository;
    private final AssignmentClient assignmentClient;
    private final DepartmentMappingService departmentMappingService;
    private final ClassificationClient classificationClient;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            UserRepository userRepository,
            AssignmentClient assignmentClient,
            DepartmentMappingService departmentMappingService,
            ClassificationClient classificationClient
    ) {
        this.complaintRepository = complaintRepository;
        this.userRepository = userRepository;
        this.assignmentClient = assignmentClient;
        this.departmentMappingService = departmentMappingService;
        this.classificationClient = classificationClient;
    }

    public ComplaintResponseDTO createComplaint(
            ComplaintCreateRequestDTO request,
            Long userId
    ) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        /*
         * Classify the complaint using the Python
         * classification service.
         */
        ComplaintClassificationResponseDTO classification =
                classificationClient.classify(
                        request.getTitle(),
                        request.getDescription()
                );

        /*
         * Create the complaint using the category
         * and priority returned by the classifier.
         */
        Complaint complaint = new Complaint(
                request.getTitle(),
                request.getDescription(),
                classification.getCategory(),
                Priority.valueOf(
                        classification.getPriority().toUpperCase()
                ),
                user
        );

        complaint.setStatus(ComplaintStatus.OPEN);

        Complaint savedComplaint =
                complaintRepository.save(complaint);

        /*
         * Determine the department from the classified
         * complaint category.
         */
        String department =
                departmentMappingService.getDepartment(
                        classification.getCategory()
                );

        /*
         * Automatically assign the complaint
         * through the C# Assignment Service.
         */
        assignmentClient.autoAssign(
                savedComplaint.getId(),
                department
        );

        return mapToDTO(savedComplaint);
    }

    @Transactional(readOnly = true)
    public List<ComplaintResponseDTO> getAllComplaints() {

        return complaintRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    @Transactional(readOnly = true)
    public ComplaintResponseDTO getComplaintById(Long id) {

        Complaint complaint = getComplaintEntityById(id);

        return mapToDTO(complaint);
    }

    @Transactional(readOnly = true)
    public List<ComplaintResponseDTO> getComplaintsByUser(
            Long userId
    ) {

        if (!userRepository.existsById(userId)) {
            throw new RuntimeException("User not found");
        }

        return complaintRepository.findByUserId(userId)
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public ComplaintResponseDTO updateStatus(
            Long id,
            ComplaintStatus status
    ) {

        Complaint complaint = getComplaintEntityById(id);

        complaint.setStatus(status);

        Complaint updatedComplaint =
                complaintRepository.save(complaint);

        return mapToDTO(updatedComplaint);
    }

    public void deleteComplaint(Long id) {

        if (!complaintRepository.existsById(id)) {
            throw new RuntimeException("Complaint not found");
        }

        complaintRepository.deleteById(id);
    }

    private Complaint getComplaintEntityById(Long id) {

        return complaintRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Complaint not found"));
    }

    private ComplaintResponseDTO mapToDTO(
            Complaint complaint
    ) {

        User user = complaint.getUser();

        UserResponseDTO userDTO =
                new UserResponseDTO(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole(),
                        user.getCreatedAt()
                );

        return new ComplaintResponseDTO(
                complaint.getId(),
                complaint.getTitle(),
                complaint.getDescription(),
                complaint.getCategory(),
                complaint.getPriority(),
                complaint.getStatus(),
                complaint.getCreatedAt(),
                complaint.getUpdatedAt(),
                userDTO
        );
    }
}