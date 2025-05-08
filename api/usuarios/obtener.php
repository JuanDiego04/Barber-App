<?php
header('Content-Type: application/json');

require_once '../config/conexion.php';

try {
    $stmt = $pdo->prepare("SELECT id, nombre, email, rol, fechaRegistro FROM usuarios");
    $stmt->execute();

    $usuarios = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode($usuarios);
} catch (PDOException $e) {
    echo json_encode([
        "error" => "Error al obtener los usuarios: " . $e->getMessage()
    ]);
}
?>
