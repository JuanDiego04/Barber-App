<?php
require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->id)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "ID del producto requerido."]);
    exit;
}

$id = $data->id;
$nombre = $data->nombre ?? null;
$descripcion = $data->descripcion ?? null;
$precio = $data->precio ?? null;
$stock = $data->stock ?? null;
$categoria = $data->categoria ?? null;

try {
    $campos = [];
    $valores = [];

    if ($nombre !== null) {
        $campos[] = "nombre = ?";
        $valores[] = $nombre;
    }
    if ($descripcion !== null) {
        $campos[] = "descripcion = ?";
        $valores[] = $descripcion;
    }
    if ($precio !== null) {
        $campos[] = "precio = ?";
        $valores[] = $precio;
    }
    if ($stock !== null) {
        $campos[] = "stock = ?";
        $valores[] = $stock;
    }
    if ($categoria !== null) {
        $campos[] = "categoria = ?";
        $valores[] = $categoria;
    }

    if (empty($campos)) {
        http_response_code(400);
        echo json_encode(["mensaje" => "No se proporcionaron campos para actualizar."]);
        exit;
    }

    $valores[] = $id;
    $sql = "UPDATE productos SET " . implode(', ', $campos) . " WHERE id = ?";
    $stmt = $pdo->prepare($sql);
    $stmt->execute($valores);

    echo json_encode(["mensaje" => "Producto actualizado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
