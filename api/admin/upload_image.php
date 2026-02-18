<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';
require_once __DIR__ . '/../jwt_helper.php';

// Protect route (Admin only)
$token = JWT::getBearerToken();
$decoded = JWT::validate($token);
if (!$decoded || $decoded['role'] !== 'admin') {
    Response::error("Unauthorized access.", 403);
}

if (!isset($_FILES['image'])) {
    Response::error("No image uploaded.");
}

$target_dir = "../uploads/products/";
if (!file_exists($target_dir)) {
    mkdir($target_dir, 0777, true);
}

$file_extension = strtolower(pathinfo($_FILES["image"]["name"], PATHINFO_EXTENSION));
$new_filename = uniqid() . '.' . $file_extension;
$target_file = $target_dir . $new_filename;

// Check if image file is a actual image or fake image
$check = getimagesize($_FILES["image"]["tmp_name"]);
if ($check === false) {
    Response::error("File is not an image.");
}

// Check file size (max 5MB)
if ($_FILES["image"]["size"] > 5000000) {
    Response::error("File is too large.");
}

// Allow certain file formats
if (
    $file_extension != "jpg" && $file_extension != "png" && $file_extension != "jpeg"
    && $file_extension != "gif" && $file_extension != "webp"
) {
    Response::error("Sorry, only JPG, JPEG, PNG, WEBP & GIF files are allowed.");
}

if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
    // Return relative path for storage in DB
    $image_path = "/api/uploads/products/" . $new_filename;
    Response::success("Image uploaded successfully", ["path" => $image_path]);
} else {
    Response::error("Sorry, there was an error uploading your file.");
}
?>