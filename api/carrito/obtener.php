<?php
require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->usuarioId)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Falta el ID del usuario."]);
    exit;
}

$usuarioId = $data->usuarioId;

try {
    $stmt = $pdo->prepare("SELECT * FROM carrito WHERE usuarioId = ?");
    $stmt->execute([$usuarioId]);
    $carrito = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($carrito);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
