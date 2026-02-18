<?php
// Database Configuration
define('DB_HOST', 'localhost');
define('DB_NAME', 'choshmazone_db');
define('DB_USER', 'root');
define('DB_PASS', '');

// Security
define('JWT_SECRET', 'your_super_secret_key_here_change_in_production');
define('JWT_EXPIRY', 86400); // 24 hours

// Error Reporting (Disable in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Timezone
date_default_timezone_set('Asia/Dhaka');
?>