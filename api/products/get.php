<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';

$database = new Database();
$db = $database->getConnection();

$id = isset($_GET['id']) ? $_GET['id'] : null;

if (!$id) {
    Response::error("Product ID is required");
}

try {
    // Fetch product details
    $query = "SELECT p.*, c.name as category_name 
              FROM products p 
              LEFT JOIN categories c ON p.category_id = c.id 
              WHERE p.id = ? AND p.status = 'active'";
    $stmt = $db->prepare($query);
    $stmt->execute([$id]);
    $product = $stmt->fetch();

    if (!$product) {
        Response::error("Product not found", 404);
    }

    // Fetch images
    $imgQuery = "SELECT image_url, is_main FROM product_images WHERE product_id = ? ORDER BY is_main DESC";
    $imgStmt = $db->prepare($imgQuery);
    $imgStmt->execute([$id]);
    $product['images'] = $imgStmt->fetchAll();

    Response::success("Product details fetched successfully", $product);
} catch (PDOException $e) {
    Response::error("Error fetching product: " . $e->getMessage(), 500);
}
?>