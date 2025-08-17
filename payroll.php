<?php
// Dummy data - can be fetched from DB too
$payroll = [
    ["name" => "John Doe", "salary" => 45000],
    ["name" => "Jane Smith", "salary" => 55000],
    ["name" => "Raj Patel", "salary" => 60000],
];

echo json_encode($payroll);
?>
