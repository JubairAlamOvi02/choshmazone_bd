<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'config.php';

try {
    $dsn = "mysql:host=" . DB_HOST . ";charset=utf8mb4";
    $pdo = new PDO($dsn, DB_USER, DB_PASS);

    echo "Connection to MySQL successful!<br>";

    $stmt = $pdo->query("SHOW DATABASES LIKE '" . DB_NAME . "'");
    $dbExists = $stmt->fetch();

    if ($dbExists) {
        echo "Database '" . DB_NAME . "' exists!<br>";

        $pdo->query("USE " . DB_NAME);
        $stmt = $pdo->query("SHOW TABLES");
        $tables = $stmt->fetchAll(PDO::FETCH_COLUMN);

        echo "Tables in '" . DB_NAME . "':<br>";
        if (empty($tables)) {
            echo "None found.";
        } else {
            foreach ($tables as $table) {
                echo "- $table<br>";
            }
        }
    } else {
        echo "Database '" . DB_NAME . "' does NOT exist!<br>";
        echo "Attempting to create database...<br>";

        try {
            $pdo->exec("CREATE DATABASE " . DB_NAME);
            echo "Database created successfully!<br>";

            // Now import the schema
            $pdo->query("USE " . DB_NAME);
            $sql = file_get_contents('database_schema.sql');
            if ($sql) {
                $pdo->exec($sql);
                echo "Schema imported successfully!<br>";
            } else {
                echo "Could not find database_schema.sql<br>";
            }
        } catch (PDOException $e) {
            echo "Error creating database: " . $e->getMessage();
        }
    }
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>