<?php
require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->nombre, $data->precio)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan campos obligatorios."]);
    exit;
}

$nombre = $data->nombre;
$descripcion = $data->descripcion ?? '';
$precio = $data->precio;
$stock = $data->stock ?? 0;
$categoria = $data->categoria ?? '';

try {
    $stmt = $pdo->prepare("INSERT INTO productos (nombre, descripcion, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$nombre, $descripcion, $precio, $stock, $categoria]);
    echo json_encode(["mensaje" => "Producto creado exitosamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
