<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Si la solicitud es una pre-solicitud (OPTIONS), responder con OK
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Conexión a la base de datos
$host = "localhost";
$user = "root";
$password = "";
$dbname = "barberapp";

$conn = new mysqli($host, $user, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error de conexión a la base de datos"]);
    exit();
}

// Recibe y decodifica el JSON
$data = json_decode(file_get_contents("php://input"), true);

// Verificación de datos recibidos
if (!isset($data['id']) || !isset($data['password']) || !isset($data['newPassword'])) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan datos obligatorios"]);
    exit();
}

$id = $conn->real_escape_string($data['id']);
$password = $conn->real_escape_string($data['password']);
$newPassword = $conn->real_escape_string($data['newPassword']);

// Verifica que la contraseña actual sea correcta
$sql = "SELECT password FROM usuarios WHERE id = $id";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    
    // Compara la contraseña actual con la almacenada
    if ($password === $user['password']) {
        // Actualiza la contraseña
        $sqlUpdate = "UPDATE usuarios SET password = '$newPassword' WHERE id = $id";
        if ($conn->query($sqlUpdate) === TRUE) {
            echo json_encode(["mensaje" => "Contraseña actualizada correctamente"]);
        } else {
            http_response_code(500);
            echo json_encode(["mensaje" => "Error al actualizar la contraseña"]);
        }
    } else {
        http_response_code(400);
        echo json_encode(["mensaje" => "La contraseña actual no es correcta"]);
    }
} else {
    http_response_code(400);
    echo json_encode(["mensaje" => "Usuario no encontrado"]);
}

$conn->close();
?>

