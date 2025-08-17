<?php
require_once '../config/config.php';

$name = $_GET['name'] ?? '';
$results = [];

if ($name) {
    $stmt = $conn->prepare("SELECT name, email, role FROM employees WHERE name LIKE ?");
    $likeName = "%$name%";
    $stmt->bind_param("s", $likeName);
    $stmt->execute();
    $res = $stmt->get_result();

    while ($row = $res->fetch_assoc()) {
        $results[] = $row;
    }

    $stmt->close();
}
echo json_encode($results);
$conn->close();
?>
