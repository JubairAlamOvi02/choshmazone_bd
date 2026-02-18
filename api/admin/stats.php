<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET");
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

try {
    // Total Revenue
    $revenue_query = "SELECT SUM(total_amount) as total FROM orders WHERE payment_status = 'paid'";
    $revenue_stmt = $db->query($revenue_query);
    $total_revenue = $revenue_stmt->fetch()['total'] ?? 0;

    // Total Orders
    $orders_query = "SELECT COUNT(*) as total FROM orders";
    $orders_stmt = $db->query($orders_query);
    $total_orders = $orders_stmt->fetch()['total'] ?? 0;

    // Total Customers
    $customers_query = "SELECT COUNT(*) as total FROM users WHERE role = 'customer'";
    $customers_stmt = $db->query($customers_query);
    $total_customers = $customers_stmt->fetch()['total'] ?? 0;

    // Recent Sales Data (for chart)
    $chart_query = "SELECT DATE_FORMAT(created_at, '%a') as name, SUM(total_amount) as sales 
                    FROM orders 
                    WHERE created_at >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                    GROUP BY DATE(created_at)
                    ORDER BY created_at ASC";
    $chart_stmt = $db->query($chart_query);
    $chart_data = $chart_stmt->fetchAll();

    Response::success("Stats fetched successfully", [
        "total_revenue" => $total_revenue,
        "total_orders" => $total_orders,
        "total_customers" => $total_customers,
        "chart_data" => $chart_data
    ]);

} catch (Exception $e) {
    Response::error("Failed to fetch stats: " . $e->getMessage(), 500);
}
?>