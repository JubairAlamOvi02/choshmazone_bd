<?php
header("Content-Type: application/json; charset=UTF-8");
require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';

$database = new Database();
$db = $database->getConnection();

$full_name = "Admin User";
$email = "admin@choshmazone.com";
$password = "admin123";
$role = "admin";

// Check if user already exists
$check_query = "SELECT id FROM users WHERE email = ?";
$check_stmt = $db->prepare($check_query);
$check_stmt->execute([$email]);

if ($check_stmt->fetch()) {
    Response::error("Admin user already exists.");
}

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

$query = "INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)";
$stmt = $db->prepare($query);

try {
    if ($stmt->execute([$full_name, $email, $hashed_password, $role])) {
        Response::success("Admin user created successfully.", [
            "email" => $email,
            "password" => $password
        ]);
    } else {
        Response::error("Failed to create admin user.");
    }
} catch (Exception $e) {
    Response::error("Error: " . $e->getMessage());
}
?>