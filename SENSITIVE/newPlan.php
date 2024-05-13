<?php
header("Location: admin-reference.php");
date_default_timezone_set("America/New_York");

$servername = "localhost";
$username = "phpUser";
$password = "F3kGVpEBNw4YA#Z";
$database = "attendancedb";
$myArray = array();
$plan_type = $_POST["plan-type"];
$student = $_POST["plan-full_name"];
$date = $_POST["plan-date"];
$time = $_POST["plan-time"];
$reason = $_POST["plan-reason"];

if ($plan_type == "plan-late") {
    $sql = "INSERT INTO absence_plan 
            (student, start_date, end_date, start_time, end_time, reason)
            VALUES ('$student', '$date', '$date', '$time', '', '$reason')";
} elseif ($plan_type == "plan-early") {
    $sql = "INSERT INTO absence_plan 
            (student, start_date, end_date, start_time, end_time, reason)
            VALUES ('$student', '$date', '$date', '', '$time', '$reason')";
} elseif ($plan_type == "all_day") {
    $sql = "INSERT INTO absence_plan 
            (student, start_date, end_date, start_time, end_time, reason)
            VALUES ('$student', '$date', '$date', 'N/A', 'N/A', '$reason')";
}

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
$conn->query($sql);

session_start();
$_SESSION['verification'] = "C98W58~i)'K6pVv_BBD6Si6.uy1zBrQrI8kI=Wep@6kOIZ2?`f";

$conn->close();
?>
