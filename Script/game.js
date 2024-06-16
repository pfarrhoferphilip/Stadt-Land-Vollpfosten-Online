let counter = document.getElementById('counter');
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let countdownActive = false;
let box_length = 0;


// Überprüfen und Wiederherstellen des gespeicherten Status beim Laden der Seite
window.onload = function () {
    if (seconds > 0) {
        counter.innerHTML = seconds;
        //countdownActive = true;
        //setTimeout(count_down, 1000);
        //start_counter();
    }
};

function setCountdown() {
    if (gameoption == "normal") {
        seconds = 240;
    } else if (gameoption == "schnell") {
        seconds = 190;
    } else {
        seconds = 320;
    }
}

function start_counter() {
    //if (!countdownActive) {
    if (gameoption == "normal") {
        seconds = 240;
    } else if (gameoption == "schnell") {
        seconds = 190;
    } else {
        seconds = 320;
    }
    //}
    //seconds = parseInt(localStorage.getItem('seconds'));


    // Speichere den initialen Wert in localStorage
    localStorage.setItem('seconds', seconds);

    console.log("Countdown started");
    countdownActive = true;
    setTimeout(count_down, 1000);
}

function count_down() {
    seconds--;
    counter.innerHTML = seconds;
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

function finished() {
    const inputs = document.querySelectorAll('input[type="text"]');
    let allFilled = true;

    inputs.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error-border');
            allFilled = false;
        } else {
            input.classList.remove('error-border');
        }
    });

    if (allFilled) {
        countdownEnded(); // Function to add a new row of input fields
    } else {
        alert("NICHT FERTIG!");
    }
}

function generateAnswerString() {
    const inputs = document.querySelectorAll('input[type="text"]');
    let count = 0;
    let answer_string = "";

    inputs.forEach(input => {
        count++;

        if (count < inputs.length) {
            answer_string += input.value + ',';
        } else {
            answer_string += input.value;
        }
    });

    console.log(answer_string);
    return answer_string;
}

function addNewRow() {
    // Construct the HTML for new input fields
    let newRowHTML = '<tr>';
    for (let i = 0; i < box_length; i++) {
        if (i === 0) {
            newRowHTML += `
                <th class="left">
                    <input type="text" name="text" class="input error-border" data-index="${i}">
                </th>`;
        } else {
            newRowHTML += `
                <th>
                    <input type="text" name="text" class="input error-border" data-index="${i}">
                </th>`;
        }
    }
    newRowHTML += '</tr>';

    // Append the new row to the game board
    document.getElementById('game-board').insertAdjacentHTML('beforeend', newRowHTML);

    // Add event listeners to the new input fields
    const newInputs = document.querySelectorAll('#game-board tr:last-child input');
    newInputs.forEach(input => {
        input.addEventListener('keydown', function (event) {
            // Similar event handling as in setGameoptions()
        });
    });

    // Focus on the first input field of the new row
    if (newInputs.length > 0) {
        newInputs[0].focus();
    }
}

function setLetter() {
    document.getElementById('random-letter').innerHTML = letter;
}


function setGameoptions() {
    if (!countdownActive)
        start_counter();
    setLetter();
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

    // Erzeugen der Tabellenzeilen für Kategorien
    let str = `<tr>`;
    for (let i = 0; i < box_length; i++) {
        if (i === 0) {
            str += `
                <th class="left">
                    ${categories[category][i]["category" + (i + 1)]}
                </th>`;
        } else {
            str += `
                <th>
                    ${categories[category][i]["category" + (i + 1)]}
                </th>`;
        }
    }
    str += `</tr>`;

    // Erzeugen der Tabellenzeilen für Input-Felder
    let str2 = `<tr>`;
    for (let i = 0; i < box_length; i++) {
        if (i === 0) {
            str2 += `
                <th class="left">
                    <input type="text" name="text" class="input error-border" data-index="${i}">
                </th>`;
        } else {
            str2 += `
                <th>
                    <input type="text" name="text" class="input error-border" data-index="${i}">
                </th>`;
        }
    }
    str2 += `</tr>`;

    // Einsetzen der erzeugten Tabellenzeilen in das Spielbrett
    document.getElementById('game-board').innerHTML = str + str2;

    // Event Listener für Tastatureingaben (Enter-Taste und andere Tastatureingaben)
    const inputs = document.getElementsByClassName('input');
    for (let input of inputs) {
        input.addEventListener('keydown', function (event) {
            // Überprüfe auf Tastatureingaben
            const index = parseInt(input.getAttribute('data-index'));
            const nextIndex = (index + 1) % box_length; // Circular navigation
            if (event.key === "Enter") {
                event.preventDefault(); // Verhindern des Standardverhaltens der Enter-Taste (Formular absenden)
                inputs[nextIndex].focus(); // Fokussiere das nächste Input-Feld
            }

            // Überprüfung auf leeren Input
            if (input.value.trim() === '') {
                input.classList.add('error-border'); // Füge rote Border hinzu
            } else {
                input.classList.remove('error-border'); // Entferne rote Border
            }
        });
    }

    // Fokusiere das erste Input-Feld beim Start
    if (inputs.length > 0) {
        inputs[0].focus();
    }
}