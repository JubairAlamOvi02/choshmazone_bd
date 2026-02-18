<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

require_once __DIR__ . '/../db.php';
require_once __DIR__ . '/../response.php';
require_once __DIR__ . '/../jwt_helper.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

$database = new Database();
$db = $database->getConnection();

$data = json_decode(file_get_contents("php://input"));

if (
    !isset($data->customer_name) ||
    !isset($data->customer_email) ||
    !isset($data->customer_phone) ||
    !isset($data->district) ||
    !isset($data->thana) ||
    !isset($data->shipping_address) ||
    !isset($data->items) ||
    empty($data->items) ||
    !isset($data->payment_method)
) {
    Response::error("Incomplete order data.");
}

// Optional User ID from JWT
$user_id = null;
$token = JWT::getBearerToken();
if ($token) {
    $decoded = JWT::validate($token);
    if ($decoded) {
        $user_id = $decoded['id'];
    }
}

try {
    $db->beginTransaction();

    // Insert Order
    $query = "INSERT INTO orders 
              (user_id, total_amount, delivery_charge, payment_method, customer_name, customer_email, customer_phone, district, thana, shipping_address, order_notes, status, payment_status) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending', 'unpaid')";

    $stmt = $db->prepare($query);
    $stmt->execute([
        $user_id,
        $data->total_amount,
        $data->delivery_charge,
        $data->payment_method,
        $data->customer_name,
        $data->customer_email,
        $data->customer_phone,
        $data->district,
        $data->thana,
        $data->shipping_address,
        $data->order_notes ?? null
    ]);

    $order_id = $db->lastInsertId();

    // Insert Order Items
    $item_query = "INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)";
    $item_stmt = $db->prepare($item_query);

    foreach ($data->items as $item) {
        $item_stmt->execute([
            $order_id,
            $item->id,
            $item->quantity,
            $item->price
        ]);

        // Update product stock (simple version)
        $update_stock = "UPDATE products SET stock_quantity = stock_quantity - ? WHERE id = ?";
        $stock_stmt = $db->prepare($update_stock);
        $stock_stmt->execute([$item->quantity, $item->id]);
    }

    $db->commit();
    Response::success("Order placed successfully", ["order_id" => $order_id]);

} catch (Exception $e) {
    $db->rollBack();
    Response::error("Failed to place order: " . $e->getMessage(), 500);
}
?>