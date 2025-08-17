<?php
require_once '../config/config.php';

$name = $_POST['name'] ?? '';
$email = $_POST['email'] ?? '';
$role = $_POST['role'] ?? '';

if ($name && $email && $role) {
    $stmt = $conn->prepare("INSERT INTO employees (name, email, role) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $name, $email, $role);
    $stmt->execute();

    echo json_encode(["message" => "Registration successful."]);
    $stmt->close();
} else {
    echo json_encode(["message" => "Please fill all fields."]);
}
$conn->close();
?>
