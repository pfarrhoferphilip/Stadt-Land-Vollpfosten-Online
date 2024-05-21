/*-------- Random Letter --------*/
let random_letter = generate_random_letter();
let gameoptionn;
let categoryy;
let letterr;
document.getElementById('random-letter').innerHTML = random_letter.toUpperCase();

function generate_random_letter() {
    // Generate a random number between 0 and 25 (inclusive)
    let random_numebr = Math.floor(Math.random() * 26);

    // Map the random number to a corresponding letter in the alphabet
    let random_letter = String.fromCharCode(97 + random_numebr); // Using ASCII code for lowercase letters

    return random_letter;
}


/*-------- Counter --------*/

let counter = document.getElementById('counter');
let seconds = 0;

function start_counter() {
    counter.innerHTML = seconds;
    //seconds--;

    if (gameoptionn == "normal") {
        seconds = 240;
    } else if (gameoptionn == "schnell") {
        seconds = 190;
    } else {
        seconds = 320;
    }
    console.log("Countdown started");
    count_down();
}

function count_down() {
    counter.innerHTML = seconds;
    seconds -= 1;
    console.log("Count down");

    if (seconds >= 0) {
        setTimeout(count_down, 1000);
    } else {
        console.log("Countdown abgelaufen!");
        countdownEnded();
    }
}

/*-------- Headlines --------*/


function setGameoptions(_gameoption, _category, _letter) {
    console.log(_gameoption + " : " + _category + " : " + _letter);
    gameoptionn = _gameoption;
    categoryy = _category;
    letterr = _letter;
    start_counter();
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