<?php
$servername = "";
$username = "";
$password = "";
$database = "";
$_SESSION['user_id'] = null;

$conn = new mysqli($servername, $username, $password, $database);
$username = $_POST['username'];
$password = $_POST['password'];
$sql = "SELECT userID
        FROM users
        WHERE username = '$username'
        AND password = '$password'";

$result = $conn->query($sql);
if (mysqli_num_rows($result) == 1)  {
    session_start();
    $_SESSION['verification'] = "C98W58~i)'K6pVv_BBD6Si6.uy1zBrQrI8kI=Wep@6kOIZ2?`f";
    header('location: admin-reference.php');
    exit;
} else {
    header('location: index.html');
    exit;
}

$conn->close();
?>
