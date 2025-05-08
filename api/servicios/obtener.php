<?php
require_once '../config/conexion.php';
header("Content-Type: application/json");

try {
    $stmt = $pdo->query("SELECT * FROM servicios");
    $servicios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($servicios);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>