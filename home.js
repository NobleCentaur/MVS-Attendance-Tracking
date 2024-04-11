window.onload = function() {
    var xhttp = new XMLHttpRequest();
    const table_attendance = document.getElementById("home-table");
    let currentYear = parseInt(new Date().toJSON().slice(0, 4));

    const absencePercent = document.getElementById("absencePercent");
    xhttp.open("GET", "query.php?value1=8&value2=null", false);
    xhttp.send();
    absences = JSON.parse(xhttp.responseText);
    xhttp.open("GET", "query.php?value1=9&value2=null", false);
    xhttp.send();
    students = JSON.parse(xhttp.responseText);
    var percentAttendance = 100 - ((absences.length / students.length) * 100)

    absencePercent.innerHTML = percentAttendance + "% attendance"

    // get all freshmen
    xhttp.open("GET", "query.php?value1=7&value2="+(currentYear+3), false);
    xhttp.send();
    freshmen = JSON.parse(xhttp.responseText);
    // get all sophomores
    xhttp.open("GET", "query.php?value1=7&value2="+(currentYear+2), false);
    xhttp.send();
    sophomores = JSON.parse(xhttp.responseText);
    // get all juniors
    xhttp.open("GET", "query.php?value1=7&value2="+(currentYear+1), false);
    xhttp.send();
    juniors = JSON.parse(xhttp.responseText);
    // get all seniors
    xhttp.open("GET", "query.php?value1=7&value2="+currentYear, false);
    xhttp.send();
    seniors = JSON.parse(xhttp.responseText);
     
    // find the class with most students absent
    max = Math.max(freshmen.length, sophomores.length, juniors.length, seniors.length);

    for (var i = 0 ; i < max; i++) {
        var row = table_attendance.insertRow();
        var cell;
        var content

        cell = row.insertCell();
        if (freshmen.length > i) {
            content = document.createTextNode(freshmen[i]["first_name"] + " " + freshmen[i]["last_name"]);
            cell.appendChild(content);
        }

        cell = row.insertCell();
        if (sophomores.length > i) {
            content = document.createTextNode(sophomores[i]["first_name"] + " " + sophomores[i]["last_name"]);
            cell.appendChild(content);
        }

        cell = row.insertCell();
        if (juniors.length > i) {
            content = document.createTextNode(juniors[i]["first_name"] + " " + juniors[i]["last_name"]);
            cell.appendChild(content);
        }

        cell = row.insertCell();
        if (seniors.length > i) {
            content = document.createTextNode(seniors[i]["first_name"] + " " + seniors[i]["last_name"]);
            cell.appendChild(content);
        }
    }

    /*
    ============================
    SECTION FOR PLANNED ABSENCES
    ============================
    */
    
    const table = document.getElementById("plan-table");
    let currentDate = new Date().toJSON().slice(0, 10);

    // absences loading
    xhttp.open("GET", "query.php?value1=6&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    console.log(response);
    for (var i = 0 ; i < response.length ; i++) {
        if (response[i]["end_date"] >= currentDate) {
            var row = table.insertRow();
            var cell = row.insertCell();
            var content = document.createTextNode(response[i]["student"])
            cell.appendChild(content);
            // ---
            cell = row.insertCell();
            if (response[i]["start_date"] == response[i]["end_date"]) {
                content = document.createTextNode(response[i]["start_date"]);    
            } else {
                content = document.createTextNode(response[i]["start_date"] + "::" + response[i]["end_date"]);
            }
            cell.appendChild(content);
            // ---
            cell = row.insertCell();
            content = document.createTextNode(response[i]["time_in"]);
            cell.appendChild(content);
            // ---
            cell = row.insertCell();
            content = document.createTextNode(response[i]["time_out"]);
            cell.appendChild(content);
            // ---
            cell = row.insertCell();
            content = document.createTextNode(response[i]["reason"]);
            cell.appendChild(content);
        } else {
            console.log(response[i]["end_date"]);
        }
    }
}
