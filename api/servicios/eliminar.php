<?php
require_once '../config/conexion.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Falta el ID del servicio a eliminar."]);
    exit;
}

$id = $data->id;

try {
    $stmt = $pdo->prepare("DELETE FROM servicios WHERE id = ?");
    $stmt->execute([$id]);
    echo json_encode(["mensaje" => "Servicio eliminado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>