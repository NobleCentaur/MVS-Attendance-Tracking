window.onload = function() {
    var response
    var selection

    /*
    =========================
    SECTION FOR LIVE ABSENCES
    =========================
    */

    // live attendance form items
    const attendance_missing = document.getElementById("missing");
    const attendance_late = document.getElementById("late");
    const attendance_early = document.getElementById("early");
    const graduationSel = document.getElementById("graduation");
    const nameSel = document.getElementById("full_name");
    const reasonSel = document.getElementById("reason");
    const button = document.getElementById("submit")

    // XML object
    var xhttp = new XMLHttpRequest();

    // set all form items to no display to force user to select the attendance type first
    graduationSel.style.display = "none";
    nameSel.style.display = "none";
    reasonSel.style.display = "none";
    button.style.display = "none";

    // attendance reason loading
    xhttp.open("POST", "query-reference.php?value1=3&value2=null",false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["reasonID"];
        opt.innerHTML = response[i]["reason"];
        reasonSel.appendChild(opt);
    }

    // graduation year loading
    xhttp.open("POST", "query-reference.php?value1=1&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["graduation_year"];
        opt.innerHTML = response[i]["graduation_year"];
        graduationSel.appendChild(opt);
    }

    graduationSel.onchange = function(){
        nameSel.length = 1;
        selection = graduationSel.value;

        xhttp.open("POST", "query-reference.php?value1=2&value2="+selection, false);
        xhttp.send();
        response = JSON.parse(xhttp.responseText);
        
        for (var i = 0;i < response.length; i++) {
            var opt = document.createElement('option');
            opt.value = response[i]["studentID"];
            opt.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"];
            nameSel.appendChild(opt);
        }
    }

    attendance_missing.onchange = function() {
        button.style.display = "inline";
        graduationSel.style.display = "inline";
        nameSel.style.display = "inline";
        reasonSel.style.display = "none";
        reasonSel.value = "default";
        nameSel.length = 1;
    }
    attendance_early.onchange = function() {
        button.style.display = "inline";
        reasonSel.style.display = "inline";
        nameSel.style.display = "inline";
        graduationSel.style.display = "inline";
        nameSel.length = 1;
    }
    attendance_late.onchange = function() {
        button.style.display = "inline";
        reasonSel.style.display = "inline";
        nameSel.style.display = "inline"
        graduationSel.style.display = "none";
        graduationSel.value = "default";

        selection = graduationSel.value;
        xhttp.open("POST", "query-reference.php?value1=4&value2=null", false);
        xhttp.send();
        response = JSON.parse(xhttp.responseText);

        nameSel.length = 1;
        for (var i = 0; i < response.length; i++) {
            var opt = document.createElement('option');
            opt.value = response[i]["studentID"];
            opt.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"];
            nameSel.appendChild(opt);
        }
    }

    /*
    =========================
    SECTION FOR LIVE ABSENCES
    =========================
    */

    const missingDiv = document.getElementById("missingDiv");
    const missing_students = document.getElementById("missing_students");

    // absences loading
    xhttp.open("POST", "query-reference.php?value1=4&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0 ; i < response.length ; i++) {
        var newDiv = document.createElement("div");
        var content = document.createTextNode(response[i]["first_name"] + " " + response[i]["last_name"]);
        newDiv.appendChild(content);
        newDiv.className = "missingStudent";
        missingDiv.insertBefore(newDiv, missing_students);
    }

    const absencePercent = document.getElementById("absencePercent");
    xhttp.open("POST", "query-reference.php?value1=8&value2=null", false);
    xhttp.send();
    absences = JSON.parse(xhttp.responseText);
    xhttp.open("POST", "query-reference.php?value1=9&value2=null", false);
    xhttp.send();
    students = JSON.parse(xhttp.responseText);
    var percentAttendance = 100 - ((absences.length / students.length) * 100)

    absencePercent.innerHTML = Math.round(percentAttendance*100)/100 + "% attendance"

    /*
    ============================
    SECTION FOR PLANNED ABSENCES
    ============================
    */

    const plan_graduationSel = document.getElementById("plan-graduation");
    const plan_nameSel = document.getElementById("plan-full_name");
    const plan_reasonSel = document.getElementById("plan-reason");
    const plan_allDay = document.getElementById("all_day");
    const plan_early = document.getElementById("plan-early");
    const plan_late = document.getElementById("plan-late");
    const plan_date = document.getElementById("plan-date");
    const plan_time = document.getElementById("plan-time");
    const plan_submit = document.getElementById("plan-submit");

    // set all form items to no display to force user to select the attendance type first
    plan_graduationSel.style.display = "none";
    plan_nameSel.style.display = "none";
    plan_reasonSel.style.display = "none";
    plan_date.style.display = "none";
    plan_time.style.display = "none";
    plan_submit.style.display = "none";

    // attendance reason loading
    xhttp.open("POST", "query-reference.php?value1=3&value2=null",false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["reasonID"];
        opt.innerHTML = response[i]["reason"];
        plan_reasonSel.appendChild(opt);
    }

    // graduation year loading
    xhttp.open("POST", "query-reference.php?value1=1&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["graduation_year"];
        opt.innerHTML = response[i]["graduation_year"];
        plan_graduationSel.appendChild(opt);
    }

    plan_graduationSel.onchange = function() {
        plan_nameSel.length = 1;
        selection = plan_graduationSel.value;

        xhttp.open("POST", "query-reference.php?value1=5&value2="+selection, false);
        xhttp.send();
        response = JSON.parse(xhttp.responseText);
        
        for (var i = 0;i < response.length; i++) {
            var opt = document.createElement('option');
            opt.value = response[i]["studentID"];
            opt.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"];
            plan_nameSel.appendChild(opt);
        }
    }

    plan_allDay.onchange = function() {
        plan_graduationSel.style.display = "inline";
        plan_nameSel.style.display = "inline";
        plan_reasonSel.style.display = "inline";
        plan_date.style.display = "inline";
        plan_time.style.display = "none";
        plan_submit.style.display = "inline";


    }
    plan_early.onchange = function() {
        plan_graduationSel.style.display = "inline";
        plan_nameSel.style.display = "inline";
        plan_reasonSel.style.display = "inline";
        plan_date.style.display = "inline";
        plan_time.style.display = "inline";
        plan_submit.style.display = "inline";

    }
    plan_late.onchange = function() {
        plan_graduationSel.style.display = "inline";
        plan_nameSel.style.display = "inline";
        plan_reasonSel.style.display = "inline";
        plan_date.style.display = "inline";
        plan_time.style.display = "inline";
        plan_submit.style.display = "inline";

    }

    /*
    ============================
    SECTION FOR PLANNED ABSENCES
    ============================
    */

    const table = document.getElementById("plan-table");
    let currentDate = new Date().toJSON().slice(0, 10);

    // absences loading
    xhttp.open("POST", "query-reference.php?value1=6&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
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
        }
    }

    submitConfirm = function(form) {
        if (confirm("Are you sure? This will reset all live absences and should only be done in the mornings.")) {
            form.submit();
        }
    }
}
