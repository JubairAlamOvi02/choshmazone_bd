<?php
require_once 'db.php';

$database = new Database();
$db = $database->getConnection();

$email = 'admin@choshmazone.com';
$password = 'admin123'; // Default password
$full_name = 'Admin User';
$role = 'admin';

$hashed_password = password_hash($password, PASSWORD_DEFAULT);

try {
    // Check if user exists
    $stmt = $db->prepare("SELECT id FROM users WHERE email = ?");
    $stmt->execute([$email]);
    if ($stmt->fetch()) {
        echo "Admin user with email $email already exists.<br>";
    } else {
        $stmt = $db->prepare("INSERT INTO users (full_name, email, password, role) VALUES (?, ?, ?, ?)");
        $stmt->execute([$full_name, $email, $hashed_password, $role]);
        echo "Admin user created successfully!<br>";
        echo "Email: $email<br>";
        echo "Password: $password<br>";
    }
} catch (PDOException $e) {
    echo "Error: " . $e->getMessage();
}
?>