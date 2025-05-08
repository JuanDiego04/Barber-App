<?php
require_once '../config/conexion.php';

// Lista de orígenes permitidos
$allowedOrigins = [
    "http://localhost:8081", // Origen del frontend en localhost
    "http://186.1.185.15" // Reemplaza con la IP local de tu máquina
];

// Obtener el origen de la solicitud
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';

// Verificar si el origen está en la lista permitida
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
    header("Access-Control-Allow-Credentials: true");
}

header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    // Manejo de solicitudes preflight
    http_response_code(200);
    exit;
}

header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"));

if (!isset($data->email, $data->password)) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan el email o la contraseña."]);
    exit;
}

$email = $data->email;
$password = $data->password;

try {
    $stmt = $pdo->prepare("SELECT id, nombre, email, password, rol FROM usuarios WHERE email = ?");
    $stmt->execute([$email]);
    $usuario = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($usuario && password_verify($password, $usuario['password'])) {
        // Opcional: crear token, guardar sesión, etc.
        echo json_encode([
            "mensaje" => "Inicio de sesión exitoso.",
            "usuario" => [
                "id" => $usuario['id'],
                "nombre" => $usuario['nombre'],
                "email" => $usuario['email'],
                "rol" => $usuario['rol']
            ]
        ]);
    } else {
        http_response_code(401);
        echo json_encode(["mensaje" => "Email o contraseña incorrectos."]);
    }

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error: " . $e->getMessage()]);
}
?>