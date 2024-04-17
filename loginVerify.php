<?php
session_start();
$servername = "localhost";
$username = "loginUser";
$password = "y1i2BkU1IjCXCe7p56lG";
$database = "loginserver";

$conn = new mysqli($servername, $username, $password, $database);
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "SELECT userID
        FROM users
        WHERE username = '$username'
        AND password = '$password'";

$result = $conn->query($sql);
if (mysqli_num_rows($result) == 1)  {
    $_SESSION['user_id'] = $username;
    header('location: admin.php');
    exit;
} else {
    header('location: index.html');
    exit;
}

$conn->close();
?>