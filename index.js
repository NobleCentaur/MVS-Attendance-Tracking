window.onload = function() {
    var response
    var selection
    var graduationSel = document.getElementById("graduation");
    var nameSel = document.getElementById("full_name");
    var reasonSel = document.getElementById("reason");
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "query.php?value1=3&value2=null",false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    console.log(response);

    xhttp.open("GET", "query.php?value1=1&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    console.log(response);

    graduationSel.length = 1;
    nameSel.length = 1;

    for (var i = 0;i < response.length; i++) {
        var opt = document.createElement('option');
        opt.value = response[i]["graduation_year"];
        opt.innerHTML = response[i]["graduation_year"];
        graduationSel.appendChild(opt);
    }

    graduationSel.onchange = function(){
        nameSel.length = 1;
        selection = graduationSel.value;

        xhttp.open("GET", "query.php?value1=2&value2="+selection, false);
        xhttp.send();

        response = JSON.parse(xhttp.responseText);
        for (var i = 0;i < response.length; i++) {
            var opt = document.createElement('option');
            opt.value = response[i]["first_name"] + " " + response[i]["last_name"];
            opt.innerHTML = response[i]["first_name"] + " " + response[i]["last_name"];
            nameSel.appendChild(opt);
        }
    }
}