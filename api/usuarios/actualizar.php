<?php
header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *"); 
header("Access-Control-Allow-Methods: POST, OPTIONS"); 
header("Access-Control-Allow-Headers: Content-Type"); 

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

// Validación básica
if (!isset($data['id']) || !isset($data['nombre']) || !isset($data['email'])) {
    http_response_code(400);
    echo json_encode(["mensaje" => "Faltan datos obligatorios"]);
    exit();
}

$id = $conn->real_escape_string($data['id']);
$nombre = $conn->real_escape_string($data['nombre']);
$email = $conn->real_escape_string($data['email']);

// Actualiza los datos del usuario
$sql = "UPDATE usuarios SET nombre = '$nombre', email = '$email' WHERE id = $id";

if ($conn->query($sql) === TRUE) {
    echo json_encode(["mensaje" => "Perfil actualizado correctamente"]);
} else {
    http_response_code(500);
    echo json_encode(["mensaje" => "Error al actualizar el perfil"]);
}

$conn->close();
?>

