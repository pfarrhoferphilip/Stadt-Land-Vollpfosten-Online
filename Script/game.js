let counter = document.getElementById('counter');
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let countdownActive = false;
let box_length = 0;


// Überprüfen und Wiederherstellen des gespeicherten Status beim Laden der Seite
window.onload = function() {
    if (seconds > 0) {
        counter.innerHTML = seconds;
        countdownActive = true;
        count_down();
    }
};

function start_counter() {
    if (countdownActive) return;

    if (gameoption == "normal") {
        seconds = 240;
    } else if (gameoption == "schnell") {
        seconds = 190;
    } else {
        seconds = 320;
    }

    // Speichere den initialen Wert in localStorage
    localStorage.setItem('seconds', seconds);

    console.log("Countdown started");
    countdownActive = true;
    count_down();
}

function count_down() {
    counter.innerHTML = seconds;
    seconds--;
    //console.log("Count down");

    // Speichere den aktuellen Wert in localStorage
    localStorage.setItem('seconds', seconds);

    if (seconds >= 0) {
        setTimeout(count_down, 1000);
    } else {
        console.log("Countdown abgelaufen!");
        countdownActive = false;
        // Countdown ist abgelaufen, lösche den Wert aus localStorage
        localStorage.removeItem('seconds');
        countdownEnded();
    }
}

function setGameoptions() {
    start_counter();
    document.getElementById('random-letter').innerHTML = letter;
    category = category.charAt(0).toUpperCase() + category.slice(1);
    console.log(category);
    console.log(categories[category]);


    if (gameoption === "schnell") {
        box_length = 5;
    }
    if (gameoption === "normal") {
        box_length = 8;
    }
    if (gameoption === "senioren") {
        box_length = 6;
    }


    //Todo: Get Categories

    let str = ``;
    for (let i = 0; i < box_length; i++) {
        str += `
    <div id="headline">
        <p>${categories[category][i]["category" + (i + 1)]}</p>
    </div>`;
    }
    str += ``;
    document.getElementById('headlines').innerHTML = str;
}