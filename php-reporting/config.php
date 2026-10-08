<?php

$host = "localhost";
$port = "5432";
$dbname = "smart_service_db";
$user = "postgres";
$password = getenv("DB_PASSWORD");

$conn = pg_connect(
    "host=$host port=$port dbname=$dbname user=$user password=$password"
);

if (!$conn) {
    http_response_code(500);

    echo json_encode([
        "message" => "Database connection failed"
    ]);

    exit;
}