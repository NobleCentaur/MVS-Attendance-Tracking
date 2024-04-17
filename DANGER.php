<?php
header("Location: admin.php");

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
session_start();
$_SESSION['verification'] = "C98W58~i)'K6pVv_BBD6Si6.uy1zBrQrI8kI=Wep@6kOIZ2?`f";

$conn->close();
?>