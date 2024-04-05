window.onload = function() {
    var response
    var selection
    const graduationSel = document.getElementById("graduation");
    const nameSel = document.getElementById("full_name");
    const reasonSel = document.getElementById("reason");
    const button = document.getElementById("submit")
    const attendance_missing = document.getElementById("missing");
    const attendance_late = document.getElementById("late");
    const attendance_early = document.getElementById("early");
    const missing_students = document.getElementById("missing_students");
    const formDiv = document.getElementById("formDiv");
    var xhttp = new XMLHttpRequest();

    graduationSel.style.display = "none";
    nameSel.style.display = "none";
    reasonSel.style.display = "none";
    button.style.display = "none";

    xhttp.open("GET", "query.php?value1=3&value2=null",false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);

    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["reason"];
        opt.innerHTML = response[i]["reason"];
        reasonSel.appendChild(opt);
    }

    xhttp.open("GET", "query.php?value1=1&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);

    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["graduation_year"];
        opt.innerHTML = response[i]["graduation_year"];
        graduationSel.appendChild(opt);
    }

    xhttp.open("GET", "query.php?value1=4&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0 ; i < response.length ; i++) {
        var newDiv = document.createElement("div");
        var content = document.createTextNode(response[i]["first_name"] + " " + response[i]["last_name"]);
        newDiv.appendChild(content);
        formDiv.insertBefore(newDiv, missing_students);
    }

    graduationSel.onchange = function(){
        nameSel.length = 1;
        selection = graduationSel.value;

        xhttp.open("GET", "query.php?value1=2&value2="+selection, false);
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
    }
    attendance_early.onchange = function() {
        button.style.display = "inline";
        reasonSel.style.display = "inline";
        nameSel.style.display = "inline";
        graduationSel.style.display = "inline";
        nameSel.length = 1;

        if (graduationSel.value != "default") {
            xhttp.open("GET", "query.php?value1=2&value2="+selection, false);
            xhttp.send();
            response = JSON.parse(xhttp.responseText);
            
            for (var i = 0;i < response.length; i++) {
                var opt = document.createElement('option');
                opt.value = response[i]["studentID"];
                opt.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"];
                nameSel.appendChild(opt);
            } 
        }
    }
    attendance_late.onchange = function() {
        button.style.display = "inline";
        reasonSel.style.display = "inline";
        nameSel.style.display = "inline"
        graduationSel.style.display = "none";
        graduationSel.value = "default";

        selection = graduationSel.value;
        xhttp.open("GET", "query.php?value1=5&value2=null", false);
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
}