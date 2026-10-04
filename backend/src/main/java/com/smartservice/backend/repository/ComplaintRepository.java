package com.smartservice.backend.repository;

import com.smartservice.backend.entity.Complaint;
import com.smartservice.backend.entity.ComplaintStatus;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByUserId(Long userId);

    List<Complaint> findByStatus(ComplaintStatus status);

    List<Complaint> findByCategory(String category);
}