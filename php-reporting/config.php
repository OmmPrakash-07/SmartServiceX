<?php

$host = getenv("DB_HOST") ?: "localhost";
$port = getenv("DB_PORT") ?: "5432";
$dbname = getenv("DB_NAME") ?: "smart_service_db";
$user = getenv("DB_USER") ?: "postgres";
$password = getenv("DB_PASSWORD");
$sslmode = getenv("DB_SSLMODE") ?: "require";

if ($password === false || $password === "") {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["message" => "Database configuration is missing"]);
    exit;
}

$conn = pg_connect(
    "host=$host port=$port dbname=$dbname user=$user password=$password sslmode=$sslmode connect_timeout=10"
);

if (!$conn) {
    http_response_code(500);
    header("Content-Type: application/json");
    echo json_encode(["message" => "Database connection failed"]);
    exit;
}
