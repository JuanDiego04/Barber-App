<?php
require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "ID del producto requerido."]);
    exit;
}

$id = $data->id;

try {
    $stmt = $pdo->prepare("DELETE FROM productos WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["mensaje" => "Producto eliminado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
