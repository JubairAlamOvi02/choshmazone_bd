<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

$response = [
    "status" => "success",
    "message" => "Choshmazone API is live",
    "version" => "1.0.0",
    "environment" => "cPanel Native"
];

echo json_encode($response);
?>
