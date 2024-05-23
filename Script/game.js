let counter = document.getElementById('counter');
let seconds = 0;
let countdownActive = false;

function start_counter() {
    if (countdownActive) return;

    if (gameoption == "normal") {
        seconds = 240;
    } else if (gameoption == "schnell") {
        seconds = 190;
    } else {
        seconds = 320;
    }

    console.log("Countdown started");
    countdownActive = true;
    count_down();
}

function count_down() {
    counter.innerHTML = seconds;
    seconds--;
    console.log("Count down");

    if (seconds >= 0) {
        setTimeout(count_down, 1000);
    } else {
        console.log("Countdown abgelaufen!");
        countdownActive = false;
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