let results = localStorage.getItem("score");
if(!results){
    results = [];
}
else{
    results = JSON.parse(results);
}
results.sort(function(a,b){
    return b.score - a.score;
});

let scoreBoard = document.getElementById("scoreBoard");
let pos = 1;
results.forEach(person => {
    person.date = new Date(person.date);
    let tr = document.createElement("tr"); //crée une balise
    let position = document.createElement("td");
    let name = document.createElement("td");
    let score = document.createElement("td");
    let date = document.createElement("td");
    let countryFlag = document.createElement("td");
    let countryDiv = document.createElement("div");
    let countryName = document.createElement("div");
    let flag = document.createElement("img");


    //<img src="https://www.countryflags.io/:country_code/:style/:size.png">
    position.innerText = pos++;
    name.innerText = person.name;
    score.innerText = person.score;
    flag.src = `https://www.countryflags.io/${person.country.code || 'EU'}/shiny/32.png`;
    countryName.innerText = person.country.name || "Inconnu";
    date.innerText = formatDate(person.date);
    countryDiv.style = "display:inline";
    countryName.style = "display:inline; white-space:nowrap";
    countryFlag.style = "white-space:nowrap";
    countryDiv.appendChild(flag);
    countryFlag.appendChild(countryDiv);
    countryFlag.appendChild(countryName);
    tr.appendChild(position);
    tr.appendChild(name);
    tr.appendChild(score);
    tr.appendChild(countryFlag);
    tr.appendChild(date);
    scoreBoard.appendChild(tr);
});


function formatDate(date){
    let day = twoDigit(date.getDay());
    let month = twoDigit(date.getMonth());
    let year = date.getFullYear();
    let hour = twoDigit(date.getHours());
    let minute = twoDigit(date.getMinutes());
    return `le ${day}/${month}/${year} à ${hour}:${minute}`;
    //return "le" + day + "/" + month + "/" + year + "à" + hour + ":" + minute;
}

function twoDigit(value){
    if (value < 10)
    {
        return "0" + value;
    }
    return value;
}

/*
test({age:123});

function test(amour = {age:12}){
    console.log(amour.age);
}
*/
/*
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            // test du statut de retour de la requête AJAX
            if (xhttp.readyState == 4 && (xhttp.status == 200 || xhttp.status == 0)) {
                // on désérialise le catalogue et on le sauvegarde dans une variable
                let score = JSON.parse(xhttp.responseText);
                score.sort(function(a,b){
                    return b.score - a.score;
                });
            }
        };
        xhttp.open("GET", "./score.json", true);
        xhttp.send();

 */