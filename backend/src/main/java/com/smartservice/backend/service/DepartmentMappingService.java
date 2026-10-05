package com.smartservice.backend.service;

import org.springframework.stereotype.Service;

@Service
public class DepartmentMappingService {

    public String getDepartment(String category) {

        if (category == null) {
            throw new RuntimeException("Category is required");
        }

        return switch (category.trim().toLowerCase()) {

            case "technical support",
                 "technical",
                 "software",
                 "login",
                 "system" ->
                    "Technical Support";

            case "payment",
                 "billing",
                 "refund" ->
                    "Finance";

            case "account",
                 "profile",
                 "registration" ->
                    "Customer Support";

            case "network",
                 "internet",
                 "connectivity" ->
                    "IT Support";

            case "delivery",
                 "shipping",
                 "order" ->
                    "Operations";

            default ->
                    throw new RuntimeException(
                            "No department mapping found for category: "
                                    + category
                    );
        };
    }
}