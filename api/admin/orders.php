<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, PUT");
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

$database = new Database();
$db = $database->getConnection();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    try {
        $query = "SELECT * FROM orders ORDER BY created_at DESC";
        $stmt = $db->query($query);
        $orders = $stmt->fetchAll();
        Response::success("Orders fetched successfully", $orders);
    } catch (Exception $e) {
        Response::error("Failed to fetch orders: " . $e->getMessage(), 500);
    }
} elseif ($method === 'PUT') {
    // Update order status
    $data = json_decode(file_get_contents("php://input"));
    if (!isset($data->id) || !isset($data->status)) {
        Response::error("Incomplete data.");
    }

    try {
        $query = "UPDATE orders SET status = ? WHERE id = ?";
        $stmt = $db->prepare($query);
        $stmt->execute([$data->status, $data->id]);
        Response::success("Order status updated successfully");
    } catch (Exception $e) {
        Response::error("Failed to update order: " . $e->getMessage(), 500);
    }
}
?>