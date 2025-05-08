<?php
require_once '../config/conexion.php';
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id, $data->nombre, $data->precio)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan campos obligatorios."]);
    exit;
}

$id = $data->id;
$nombre = $data->nombre;
$descripcion = $data->descripcion ?? null;
$precio = $data->precio;
$imagen = $data->imagen ?? null;
$etiqueta = $data->etiqueta ?? null;

try {
    $stmt = $pdo->prepare("UPDATE servicios SET nombre = ?, descripcion = ?, precio = ?, imagen = ?, etiqueta = ? WHERE id = ?");
    $stmt->execute([$nombre, $descripcion, $precio, $imagen, $etiqueta, $id]);
    echo json_encode(["mensaje" => "Servicio actualizado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>