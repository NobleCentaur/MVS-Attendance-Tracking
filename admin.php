<?php
session_start();
if ($_SESSION['verification'] != "C98W58~i)'K6pVv_BBD6Si6.uy1zBrQrI8kI=Wep@6kOIZ2?`f") {
    header('location: login.html');
    exit;
}
session_destroy();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <script src="absences.js"></script>
    <link rel="stylesheet" href="stylesheet.css">
</head>
<body>
    <div class="navBar">
        <div style="width: 80%; float: left;">
            <a href="index.html" class="navButton">Home</a>
            <a href="admin.php" class="navButton">Admin</a>
            <hr>
            <div style="font-size: 1rem;">
                Admin Page 
                <form action="DANGER.php" style="display: inline;">
                    <input type="button" id="absenceClear" value="clear absences" onclick="submitConfirm(this.form)">
                </form>
            </div>
        </div>
        <div class="navBarData">
            <div id="absencePercent">
                ----
            </div>
        </div>
    </div>
    <div class="formDiv">
        <div style="width: 27.5%; float: left; padding-right: 5%; height: 100%;">
            New entry: 
            <hr>
            <form action="newEntry.php" method="POST">
                <input type="radio" id="early" value="early" name="attendance_type">
                <label for="early">Early departure</label>
                <input type="radio" id="late" value="late" name="attendance_type">
                <label for="late">Late arrival</label>
                <input type="radio" id="missing" value="missing" name="attendance_type">
                <label for="missing">Missing</label>
                <br>
                <select name="graduation" id="graduation">
                    <option value="default" selected="selected">[graduation year]</option>
                </select>
                <select name="full_name" id="full_name">
                    <option value="default" selected="selected">[name]</option>
                </select>
                <select name="reason" id="reason">
                    <option value="default" selected="selected">[reason]</option>
                </select>
                <input type="submit" value="submit" id="submit">
            </form>
        </div>
        <div style="width: 67.5%; float: right; height: 100%; overflow: auto;" id="missingDiv">
            Current absences:
            <hr>
            <div id="missing_students"></div>
        </div>
    </div>
    <div class="formDiv">
        <div style="width: 27.5%; float: left; padding-right: 5%; height: 100%;">
            New planned absence:
            <hr>
            <form action="newPlan.php" method="post">
                <input type="radio" id="all_day" value="all_day" name="plan-type">
                <label for="all_day">All day</label>
                <input type="radio" id="plan-early" value="plan-early" name="plan-type">
                <label for="plan-early">Leaving early</label>
                <input type="radio" id="plan-late" value="plan-late" name="plan-type">
                <label for="plan-late">Arriving late</label>
                <br>
                <select name="plan-graduation" id="plan-graduation">
                    <option value="default" selected="selected">[graduation year]</option>
                </select>
                <select name="plan-full_name" id="plan-full_name">
                    <option value="default" selected="selected">[name]</option>
                </select>
                <select name="plan-reason" id="plan-reason">
                    <option value="default" selected="selected">[reason]</option>
                </select>
                <br>
                <input type="date" id="plan-date" name="plan-date">
                <input type="time" id="plan-time" name="plan-time" min="08:05" max="15:30">
                <input type="submit" value="submit" id="plan-submit">
            </form>
        </div>
        <div style="width: 67.5%; float: right; height: 100%;">
            Planned absences:
            <hr>
            <table id="plan-table">
                <tr style="font-style: italic;">
                    <td>Student</td>
                    <td>Days (y-m-d)</td>
                    <td>Time in</td>
                    <td>Time out</td>
                    <td>Reason</td>
                </tr>
            </table>
        </div>
    </div>
</body>
</html>