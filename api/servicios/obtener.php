<?php
require_once '../config/conexion.php';

// Agregar encabezados CORS
header("Access-Control-Allow-Origin: *"); // Permite solicitudes desde cualquier origen
header("Access-Control-Allow-Methods: GET, POST, OPTIONS"); // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Encabezados permitidos
header("Content-Type: application/json"); // Tipo de contenido

try {
    $stmt = $pdo->query("SELECT * FROM servicios");
    $servicios = $stmt->fetchAll(PDO::FETCH_ASSOC);
    echo json_encode($servicios);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>