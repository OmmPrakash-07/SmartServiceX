<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER["REQUEST_METHOD"] === "OPTIONS") {
    http_response_code(204);
    exit;
}

header("Content-Type: application/json");

require_once "config.php";

$result = pg_query(
    $conn,
    "SELECT
        COUNT(*) AS total_complaints,
        COUNT(*) FILTER (WHERE status = 'OPEN') AS open_complaints,
        COUNT(*) FILTER (WHERE status = 'ASSIGNED') AS assigned_complaints,
        COUNT(*) FILTER (WHERE status = 'IN_PROGRESS') AS in_progress_complaints,
        COUNT(*) FILTER (WHERE status = 'RESOLVED') AS resolved_complaints,
        COUNT(*) FILTER (WHERE status = 'CLOSED') AS closed_complaints
     FROM complaints"
);

if (!$result) {
    http_response_code(500);

    echo json_encode([
        "message" => "Failed to generate complaint report"
    ]);

    exit;
}

$report = pg_fetch_assoc($result);

echo json_encode([
    "totalComplaints" => (int) $report["total_complaints"],
    "openComplaints" => (int) $report["open_complaints"],
    "assignedComplaints" => (int) $report["assigned_complaints"],
    "inProgressComplaints" => (int) $report["in_progress_complaints"],
    "resolvedComplaints" => (int) $report["resolved_complaints"],
    "closedComplaints" => (int) $report["closed_complaints"]
]);