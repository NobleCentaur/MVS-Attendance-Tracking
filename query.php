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
} elseif ($queryID == "2") {
    $sql = "SELECT students.first_name, students.last_name
            FROM students
            WHERE NOT EXISTS(
                SELECT 1 FROM absences
                WHERE students.studentID=absences.student
            ) AND students.graduation_year = $constraint
            ORDER BY students.first_name ASC";
} elseif ($queryID == "3") {
    $sql = "SELECT reason FROM absence_reason";
} elseif ($queryID == "4") {
    $sql = "SELECT students.first_name, students.last_name 
            FROM absences JOIN students 
            WHERE absences.student = students.studentID
            ORDER BY students.first_name ASC";
} elseif ($queryID == "5") {
    $sql = "SELECT students.studentID, students.first_name, students.last_name
            FROM students JOIN absences
            WHERE absences.student = students.studentID
            ORDER BY students.first_name ASC";
}

$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}
echo json_encode($myArray);

$conn->close();
?>