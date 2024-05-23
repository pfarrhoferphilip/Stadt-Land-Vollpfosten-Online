let counter = document.getElementById('counter');
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let countdownActive = false;

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
    console.log("Count down");

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
}

let str = ``;
for (let i = 0; i < 5; i++) {
    str += `
    <div id="headline">
        <p>${gameoptionuse}</p>
    </div>`;
}
str += ``;
document.getElementById('headlines').innerHTML = str;