<?php
require_once '../config/conexion.php';


$allowedOrigins = [
    "http://localhost:8081",
    "http://186.1.185.15" 
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Verificar si el origen está en la lista permitida
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}


$dataRaw = file_get_contents("php://input");


file_put_contents("debug.log", $dataRaw);

$data = json_decode($dataRaw);


if (is_null($data)) {
    http_response_code(400);
    echo json_encode([
        "mensaje" => "JSON inválido o no se recibió contenido.",
        "raw" => $dataRaw,
        "error" => json_last_error_msg()
    ]);
    exit;
}

// Verificar campos requeridos
if (!isset($data->nombre, $data->email, $data->password)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan campos obligatorios."]);
    exit;
}

$nombre = $data->nombre;
$email = $data->email;
$password = password_hash($data->password, PASSWORD_DEFAULT);
$rol = isset($data->rol) ? $data->rol : 'cliente';

try {
    $stmt = $pdo->prepare("INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)");
    $stmt->execute([$nombre, $email, $password, $rol]);
    echo json_encode(["mensaje" => "Usuario registrado correctamente."]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>