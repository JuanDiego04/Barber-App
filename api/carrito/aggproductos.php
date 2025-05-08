<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/conexion.php';

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->usuarioId, $data->productoId, $data->cantidad)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan campos obligatorios."]);
    exit;
}

$usuarioId = $data->usuarioId;
$productoId = $data->productoId;
$cantidad = $data->cantidad;

try {
    // Obtener precio desde la tabla productos
    $stmt = $pdo->prepare("SELECT precio FROM productos WHERE id = ?");
    $stmt->execute([$productoId]);
    $producto = $stmt->fetch(PDO::FETCH_ASSOC);

    if (!$producto) {
        http_response_code(404);
        echo json_encode(["mensaje" => "Producto no encontrado."]);
        exit;
    }

    $precio = $producto['precio'];

    // Verificar si ya está en el carrito
    $stmt = $pdo->prepare("SELECT id, cantidad FROM carrito WHERE usuarioId = ? AND itemId = ? AND tipo = 'producto'");
    $stmt->execute([$usuarioId, $productoId]);
    $carritoExistente = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($carritoExistente) {
        // Ya existe, sumar cantidades y recalcular precio total
        $nuevaCantidad = $carritoExistente['cantidad'] + $cantidad;
        $totalProducto = $nuevaCantidad * $precio;

        // Actualizar carrito con la nueva cantidad y precio total
        $stmt = $pdo->prepare("UPDATE carrito SET cantidad = ?, precio = ? WHERE id = ?");
        $stmt->execute([$nuevaCantidad, $totalProducto, $carritoExistente['id']]);

        $mensaje = "Cantidad de producto actualizada en el carrito.";
    } else {
        // No existe, insertar nuevo
        $totalProducto = $cantidad * $precio;
        $stmt = $pdo->prepare("INSERT INTO carrito (usuarioId, itemId, cantidad, precio, tipo) VALUES (?, ?, ?, ?, 'producto')");
        $stmt->execute([$usuarioId, $productoId, $cantidad, $totalProducto]);

        $mensaje = "Producto agregado al carrito.";
    }

    // Calcular el total general
    $stmt = $pdo->prepare("SELECT SUM(precio) AS total FROM carrito WHERE usuarioId = ?");
    $stmt->execute([$usuarioId]);
    $totalGeneral = $stmt->fetch(PDO::FETCH_ASSOC)['total'];

    echo json_encode([
        "mensaje" => $mensaje,
        "totalGeneral" => $totalGeneral
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>
