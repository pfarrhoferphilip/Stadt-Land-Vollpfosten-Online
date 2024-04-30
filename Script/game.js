/*-------- Variables --------*/

let random_letter = generate_random_letter();

/*-------- Random Letter --------*/
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
let seconds = 240;

function start_counter() {
    counter.innerHTML = seconds;
    seconds--;

    if (seconds >= 0) {
        setTimeout(start_counter, 1000);
    } else {
        console.log("Countdown abgelaufen!");
        countdownEnded();
    }
}

start_counter();

/*-------- Headlines --------*/



let str = ``;
for (let i = 0; i < 5; i++) {
    str += `
    <div id="headline">
        <p>${gameoption}</p>
    </div>`;
}
str += ``;
document.getElementById('headlines').innerHTML = str;