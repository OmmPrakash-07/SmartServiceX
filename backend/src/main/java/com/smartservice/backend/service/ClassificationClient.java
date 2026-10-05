package com.smartservice.backend.service;

import com.smartservice.backend.dto.ComplaintClassificationResponseDTO;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.nio.charset.StandardCharsets;

@Service
public class ClassificationClient {

    private final HttpClient httpClient;

    @Value("${classification.service.url}")
    private String classificationServiceUrl;

    public ClassificationClient() {
        this.httpClient = HttpClient.newHttpClient();
    }

    public ComplaintClassificationResponseDTO classify(
            String title,
            String description
    ) {

        try {

            String jsonBody =
                    "{\"title\":\""
                            + escapeJson(title)
                            + "\",\"description\":\""
                            + escapeJson(description)
                            + "\"}";

            byte[] bodyBytes =
                    jsonBody.getBytes(StandardCharsets.UTF_8);

            HttpRequest request =
                    HttpRequest.newBuilder()
                            .uri(URI.create(
                                    classificationServiceUrl
                                            + "/api/classify"
                            ))
                            .version(HttpClient.Version.HTTP_1_1)
                            .header(
                                    "Content-Type",
                                    "application/json"
                            )
                            .header(
                                    "Accept",
                                    "application/json"
                            )
                            .POST(
                                    HttpRequest.BodyPublishers
                                            .ofByteArray(bodyBytes)
                            )
                            .build();

            HttpResponse<String> response =
                    httpClient.send(
                            request,
                            HttpResponse.BodyHandlers.ofString()
                    );

            if (response.statusCode() < 200
                    || response.statusCode() >= 300) {

                throw new RuntimeException(
                        "Classification service returned HTTP "
                                + response.statusCode()
                                + ": "
                                + response.body()
                );
            }

            return parseResponse(response.body());

        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to call classification service: "
                            + e.getMessage(),
                    e
            );
        }
    }

    private ComplaintClassificationResponseDTO parseResponse(
            String json
    ) {

        ComplaintClassificationResponseDTO result =
                new ComplaintClassificationResponseDTO();

        result.setTitle(
                extractJsonValue(json, "title")
        );

        result.setDescription(
                extractJsonValue(json, "description")
        );

        result.setCategory(
                extractJsonValue(json, "category")
        );

        result.setPriority(
                extractJsonValue(json, "priority")
        );

        return result;
    }

    private String extractJsonValue(
            String json,
            String field
    ) {

        String search =
                "\"" + field + "\":\"";

        int start = json.indexOf(search);

        if (start == -1) {

            throw new RuntimeException(
                    "Missing field in classification response: "
                            + field
            );
        }

        start += search.length();

        int end = json.indexOf("\"", start);

        if (end == -1) {

            throw new RuntimeException(
                    "Invalid classification response"
            );
        }

        return json.substring(start, end);
    }

    private String escapeJson(String value) {

        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")
                .replace("\"", "\\\"")
                .replace("\n", "\\n")
                .replace("\r", "\\r")
                .replace("\t", "\\t");
    }
}