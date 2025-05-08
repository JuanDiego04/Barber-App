<?php
require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->usuarioId, $data->itemId, $data->cantidad)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan campos obligatorios."]);
    exit;
}

$usuarioId = $data->usuarioId;
$servicioId = $data->itemId;
$cantidad = $data->cantidad;

try {
    // Obtener precio desde la tabla servicios
    $stmt = $pdo->prepare("SELECT precio FROM servicios WHERE id = ?");
    $stmt->execute([$servicioId]);
    $servicio = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$servicio) {
        http_response_code(404);
        echo json_encode(["mensaje" => "Servicio no encontrado."]);
        exit;
    }

    $precio = $servicio['precio'];

    // Verificar si ya está en el carrito
    $stmt = $pdo->prepare("SELECT id, cantidad FROM carrito WHERE usuarioId = ? AND itemId = ? AND tipo = 'servicio'");
    $stmt->execute([$usuarioId, $servicioId]);
    $carritoExistente = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($carritoExistente) {
        // Ya existe, sumar cantidades y recalcular precio total
        $nuevaCantidad = $carritoExistente['cantidad'] + $cantidad;
        $totalServicio = $nuevaCantidad * $precio;  // Precio total de este servicio

        // Actualizar carrito con la nueva cantidad y precio total
        $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ?, precio = ? WHERE id = ?");
        $stmt->execute([$nuevaCantidad, $totalServicio, $carritoExistente['id']]);

        echo json_encode(["mensaje" => "Cantidad de servicio actualizada en el carrito."]);
    } else {
        // No existe, insertar nuevo
        $totalServicio = $cantidad * $precio; // Precio total del servicio
        $stmt = $pdo->prepare("INSERT INTO carrito (usuarioId, itemId, cantidad, precio, tipo) VALUES (?, ?, ?, ?, 'servicio')");
        $stmt->execute([$usuarioId, $servicioId, $cantidad, $totalServicio]);

        echo json_encode(["mensaje" => "Servicio agregado al carrito."]);
    }

    // Calcular el total general (productos y servicios)
    $stmt = $pdo->prepare("SELECT SUM(precio) AS total FROM carrito WHERE usuarioId = ?");
    $stmt->execute([$usuarioId]);
    $totalGeneral = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode(["mensaje" => "Servicio agregado al carrito.", "totalGeneral" => $totalGeneral]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
