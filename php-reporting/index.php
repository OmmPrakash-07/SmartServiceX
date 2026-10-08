<?php

header("Content-Type: application/json");

echo json_encode([
    "service" => "SmartServiceX PHP Reporting Service",
    "status" => "running"
]);