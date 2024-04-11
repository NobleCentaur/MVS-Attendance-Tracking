<?php
$servername = "localhost";
$username = "phpUser";
$password = "F3kGVpEBNw4YA#Z";
$database = "attendancedb";
$myArray = array();
$queryID = $_GET["value1"];
$constraint = $_GET["value2"];
$dateToday = date("Y-m-d");

$conn = new mysqli($servername, $username, $password, $database);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($queryID == "1") {
    // selects all the graduation years of student
    $sql = "SELECT graduation_year 
            FROM students 
            GROUP BY graduation_year";    
} elseif ($queryID == "2") {
    /*selects studentID, first name, and last name of students,
      excluding every student in the absences list and who 
      graduate in $constraint*/
    $sql = "SELECT students.studentID, students.first_name, students.last_name
            FROM students
            WHERE NOT EXISTS(
                SELECT 1 FROM absences
                WHERE students.studentID=absences.student
            ) AND students.graduation_year = $constraint
            ORDER BY students.first_name ASC";
} elseif ($queryID == "3") {
    // selects the reason and reasonID from the absence_reason table
    $sql = "SELECT reasonID, reason FROM absence_reason";
} elseif ($queryID == "4") {
    // selects all students from the absence list
    $sql = "SELECT students.studentID, students.first_name, students.last_name 
            FROM absences JOIN students 
            WHERE absences.student = students.studentID
            ORDER BY students.first_name ASC";
} elseif ($queryID == "5") {
    /*selects studentID, first name, and last name of students
      who graduate in $constraint*/
    $sql = "SELECT *
            FROM students
            WHERE graduation_year = $constraint";
} elseif ($queryID == "6") {
    /*Selects all items from absence_plan except entryID, inserts and combines 
      first and last names in the sudent column, inserts reason instead of
      reasonID, and orders them by date*/
    $sql = "SELECT concat(students.first_name, ' ', students.last_name) AS 'student', 
            absence_plan.start_date AS 'start_date', absence_plan.end_date AS 'end_date', 
            absence_plan.start_time AS 'time_in', absence_plan.end_time AS 'time_out', 
            absence_reason.reason
            FROM absence_plan JOIN students JOIN absence_reason
            WHERE students.studentID = absence_plan.student
            AND absence_reason.reasonID = absence_plan.reason
            ORDER BY absence_plan.start_date";
} elseif ($queryID == "7") {
    // selects everything but studentID
    $sql = "SELECT first_name, last_name, graduation_year
            FROM students JOIN absences
            WHERE absences.student = students.studentID
            AND students.graduation_year = $constraint";
} elseif ($queryID == "8") {
    $sql = "SELECT *
            FROM absences";
} elseif ($queryID == "9") {
    $sql = "SELECT *
            FROM students";
}

$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
    $myArray[] = $row;
}
echo json_encode($myArray);

$conn->close();
?>