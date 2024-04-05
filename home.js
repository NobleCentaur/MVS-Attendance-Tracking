window.onload = function() {
    var xhttp = new XMLHttpRequest();

    xhttp.open("GET", "query.php?value1=4&value2=null", false);
    xhttp.send();
    response = JSON.parse(xhttp.responseText);
    for (var i = 0 ; i < response.length ; i++) {
        var newDiv = document.createElement("div");
        var content = document.createTextNode(response[i]["first_name"] + " " + response[i]["last_name"]);
        newDiv.appendChild(content);
        formDiv.insertBefore(newDiv, missing_students);
    }
}