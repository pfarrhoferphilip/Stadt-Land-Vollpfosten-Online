/*-------- Variables --------*/
let counter = document.getElementById('counter');

/*-------- Random Letter --------*/

function generate_random_letter() {
    // Generate a random number between 0 and 25 (inclusive)
    var random_numebr = Math.floor(Math.random() * 26);

    // Map the random number to a corresponding letter in the alphabet
    var random_letter = String.fromCharCode(97 + random_numebr); // Using ASCII code for lowercase letters

    return random_letter;
}

// Example usage:
var random_letter = generate_random_letter();
document.getElementById('random-letter').innerHTML = random_letter.toUpperCase();

/*-------- Counter --------*/
function start_counter(seconds) {
    let timer = setInterval(function() {
        counter.innerHTML = seconds;
        seconds--;

        if (seconds < 0) {
            clearInterval(timer);
            console.log("Countdown abgelaufen!");
        }
    }, 1000);
}

start_counter(240);