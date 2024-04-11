<?php
header("Location: admin.html");

$servername = "localhost";
$username = "phpUser";
$password = "F3kGVpEBNw4YA#Z";
$database = "attendancedb";

$sql = "DELETE FROM absences 
        WHERE absences.student > 0";

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query($sql);

$conn->close();
?>