<?php
require_once '../config/conexion.php';
require_once '../vendor/autoload.php';

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

$key = 'mi_clave_secreta';

$headers = apache_request_headers();
$authHeader = isset($headers['Authorization']) ? $headers['Authorization'] : null;

if (!$authHeader) {
    http_response_code(401);
    echo json_encode(["mensaje" => "Token no proporcionado."]);
    exit;
}

$token = str_replace('Bearer ', '', $authHeader);

try {
    $decoded = JWT::decode($token, new Key($key, 'HS256'));

    $usuarioId = $decoded->id;

    $stmt = $pdo->prepare("SELECT id, nombre, email, rol FROM usuarios WHERE id = ?");
    $stmt->execute([$usuarioId]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario) {
        echo json_encode(["usuario" => $usuario]);
    } else {
        http_response_code(404);
        echo json_encode(["mensaje" => "Usuario no encontrado."]);
    }

} catch (Exception $e) {
    http_response_code(401);
    echo json_encode(["mensaje" => "Token inválido o expirado."]);
}
?>