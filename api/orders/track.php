<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';

if (!isset($_GET['order_id']) || !isset($_GET['phone'])) {
    Response::error("Order ID and Phone Number are required.");
}

$order_id = $_GET['order_id'];
$phone = $_GET['phone'];

$database = new Database();
$db = $database->getConnection();

$query = "SELECT id, status, total_amount, customer_name, created_at, delivery_charge, payment_method, payment_status, shipping_address, district, thana 
          FROM orders 
          WHERE id = ? AND customer_phone = ? 
          LIMIT 0,1";

$stmt = $db->prepare($query);
$stmt->execute([$order_id, $phone]);
$order = $stmt->fetch();

if ($order) {
    // Fetch items
    $item_query = "SELECT oi.quantity, oi.unit_price, p.name, p.id as product_id 
                   FROM order_items oi 
                   LEFT JOIN products p ON oi.product_id = p.id 
                   WHERE oi.order_id = ?";
    $item_stmt = $db->prepare($item_query);
    $item_stmt->execute([$order['id']]);
    $order['items'] = $item_stmt->fetchAll();

    Response::success("Order found", $order);
} else {
    Response::error("No order found with the provided details.", 404);
}
?>