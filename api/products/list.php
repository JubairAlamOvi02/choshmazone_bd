<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';

$database = new Database();
$db = $database->getConnection();

// Get parameters
$category = isset($_GET['category']) ? $_GET['category'] : null;
$min_price = isset($_GET['min_price']) ? $_GET['min_price'] : null;
$max_price = isset($_GET['max_price']) ? $_GET['max_price'] : null;
$sort = isset($_GET['sort']) ? $_GET['sort'] : 'newest';

$query = "SELECT p.*, c.name as category_name, pi.image_url as main_image 
          FROM products p 
          LEFT JOIN categories c ON p.category_id = c.id 
          LEFT JOIN product_images pi ON p.id = pi.product_id AND pi.is_main = 1 
          WHERE p.status = 'active'";

$params = [];

if ($category) {
    $query .= " AND c.slug = ?";
    $params[] = $category;
}

if ($min_price) {
    $query .= " AND p.price >= ?";
    $params[] = $min_price;
}

if ($max_price) {
    $query .= " AND p.price <= ?";
    $params[] = $max_price;
}

// Sorting logic
switch ($sort) {
    case 'price_low':
        $query .= " ORDER BY p.price ASC";
        break;
    case 'price_high':
        $query .= " ORDER BY p.price DESC";
        break;
    case 'newest':
    default:
        $query .= " ORDER BY p.created_at DESC";
        break;
}

try {
    $stmt = $db->prepare($query);
    $stmt->execute($params);
    $products = $stmt->fetchAll();

    Response::success("Products fetched successfully", $products);
} catch (PDOException $e) {
    Response::error("Error fetching products: " . $e->getMessage(), 500);
}
?>