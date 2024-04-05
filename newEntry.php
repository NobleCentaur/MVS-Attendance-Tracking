<?php
header("Location: admin.html");
date_default_timezone_set("America/New_York");

$servername = "localhost";
$username = "phpUser";
$password = "F3kGVpEBNw4YA#Z";
$database = "attendancedb";
$myArray = array();
$student = $_POST["full_name"];
$reason = $_POST["reason"];
$attendance_type = $_POST["attendance_type"];

$dateToday = date("Y-m-d");
$timeNow = date("H:i");

if ($attendance_type == "late") {
    $queries = 2;
    $sql = "INSERT INTO attendance_history (student, date, time_in, reason)
            6VALUES ('$student', '$dateToday', '$timeNow', '$reason')";
    $sql1 = "DELETE FROM absences WHERE student = $student";
} elseif ($attendance_type == "early") {
    $queries = 2;
    $sql = "INSERT INTO attendance_history (student, date, time_out, reason)
    VALUES ('$student', '$dateToday', '$timeNow', '$reason')";
    $sql1 = "INSERT INTO absences VALUES ($student)";   
} elseif ($attendance_type == "missing") {
    $queries = 1;
    $sql = "INSERT INTO absences VALUES ($student)";
}

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query($sql);
if ($queries > 1) {
    $conn->query($sql1);
}

$conn->close();
?>
