<?php
$servername = "localhost";
$username = "phpUser";
$password = "F3kGVpEBNw4YA#Z";
$database = "attendancedb";
$myArray = array();
$queryID = $_GET["value1"];
$constraint = $_GET["value2"];

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($queryID == "1") {
    $sql = "SELECT graduation_year 
            FROM students 
            GROUP BY graduation_year";    
} elseif ($queryID = "2") {
    $sql = "SELECT first_name, last_name 
            FROM students 
            WHERE graduation_year = $constraint 
            ORDER BY last_name ASC";
} elseif ($queryID == "3") {
    $sql = "SELECT * FROM absence_reason";
}

$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}
echo json_encode($myArray);

$conn->close();
?>