<?php
header('Content-Type: application/json');

$servername = "localhost";
$username = "php";
$dbname = "R401_API";

// Créez une connexion utilisant PDO
try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, '$iutinfo');
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}
?>