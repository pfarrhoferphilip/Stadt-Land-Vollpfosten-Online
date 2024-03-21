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

function startCounter(startValue) {
    let count = startValue;

    function decrease() {
        if (count > 0) {
            console.log(count);
            count--;
            setTimeout(decrease, 1000); // Decrease count every second
        } else {
            console.log("Counter reached zero!");
        }
    }

    decrease(); // Start the counter
}