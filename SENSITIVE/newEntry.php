<?php
header("Location: admin-reference.php");
date_default_timezone_set("America/New_York");

$servername = "";
$username = "";
$password = "";
$database = "";
$myArray = array();
$student = $_POST["full_name"];
$reason = $_POST["reason"];
$attendance_type = $_POST["attendance_type"];

$dateToday = date("Y-m-d");
$timeNow = date("H:i");

if ($attendance_type == "late") {
    $queries = 2;
    $sql = "INSERT INTO attendance_history (student, date, time_in, reason)
            VALUES ('$student', '$dateToday', '$timeNow', '$reason')";
    $sql1 = "DELETE FROM absences WHERE student = $student";
} elseif ($attendance_type == "early") {
    $queries = 2;
    $sql = "INSERT INTO attendance_history (student, date, time_out, reason)
            VALUES ('$student', '$dateToday', '$timeNow', '$reason')";
    $sql1 = "INSERT INTO absences VALUES ($student)";   
} elseif ($attendance_type == "missing") {
    $queries = 2;
    $sql = "INSERT INTO absences VALUES ($student)";
    $sql1 = "INSERT INTO attendance_history (student, date)
             VALUES ('$student', '$dateToday')";
} else {
    echo $attendance_type;
}

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query($sql);
if ($queries > 1) {
    $conn->query($sql1);
}

session_start();
$_SESSION['verification'] = "C98W58~i)'K6pVv_BBD6Si6.uy1zBrQrI8kI=Wep@6kOIZ2?`f";

$conn->close();
?>
