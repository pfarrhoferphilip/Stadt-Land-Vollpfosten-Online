let counter = document.getElementById('counter');
let seconds = parseInt(localStorage.getItem('seconds')) || 0;
let countdownActive = false;
let box_length = 0;
const submitButton = document.getElementById("button-submit");

// Überprüfen und Wiederherstellen des gespeicherten Status beim Laden der Seite
window.onload = function() {
    if (seconds > 0) {
        counter.innerHTML = seconds;
        countdownActive = true;
        setTimeout(count_down, 1000);
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

    // Speichere den initialen Wert in localStorage
    localStorage.setItem('seconds', seconds);
}

function start_counter() {
    setCountdown();
    countdownActive = true;
    setTimeout(count_down, 1000);
}

function count_down() {
    if (seconds > 0) {
        seconds--;
        counter.innerHTML = seconds;

        // Speichere den aktuellen Wert in localStorage
        localStorage.setItem('seconds', seconds);

        setTimeout(count_down, 1000);
    } else {
        console.log("Countdown abgelaufen!");
        countdownActive = false;
        // Countdown ist abgelaufen, lösche den Wert aus localStorage
        localStorage.removeItem('seconds');
        countdownEnded();
    }
}

let inputs;

function finished() {
    inputs = document.querySelectorAll('input[type="text"]');
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
        // Erfassen Sie die Texte der Input-Felder mit einem Semikolon als Trennzeichen
        const filledTexts = Array.from(inputs).map(input => input.value.trim()).join(';');
        console.log(filledTexts);
        countdownEnded(); // Hier könnte die Funktion aufgerufen werden, die den erfassten Text verarbeitet
    } else {
        alert("Bitte füllen Sie alle Felder aus");
    }
}

function generateAnswerString() {
    let count = 0;
    let answer_string = "";

    console.log(inputs.length)
    inputs.forEach(input => {
        count++;
        console.log(count)

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
    // Replace existing inputs with p elements
    inputs.forEach(input => {
        const pElement = document.createElement('p');
        pElement.textContent = input.value.trim();
        pElement.style.fontSize = "1vw";
        input.parentNode.replaceChild(pElement, input);
    });

    // Create new row with input elements
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

    document.getElementById('game-board').insertAdjacentHTML('beforeend', newRowHTML);

    const newInputs = document.querySelectorAll('#game-board tr:last-child input');
    newInputs.forEach(input => {
        input.addEventListener('keydown', function(event) {
            const index = parseInt(input.getAttribute('data-index'));
            const nextIndex = (index + 1) % box_length;
            if (event.key === "Enter") {
                event.preventDefault();
                newInputs[nextIndex].focus();
            }

            if (input.value.trim() === '') {
                input.classList.add('error-border');
            } else {
                input.classList.remove('error-border');
            }
        });
    });

    if (newInputs.length > 0) {
        newInputs[0].focus();
    }
}

function setLetter() {
    document.getElementById("random-letter").innerHTML = letter;
}

function setGameoptions() {
    if (!countdownActive) {
        start_counter();
    }
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

    document.getElementById('game-board').innerHTML = str + str2;

    inputSwitch();
}

function inputSwitch() {
    const inputs = document.getElementsByClassName('input');
    for (let input of inputs) {
        input.addEventListener('keydown', function(event) {
            const index = parseInt(input.getAttribute('data-index'));
            const nextIndex = (index + 1) % box_length;
            if (event.key === "Enter") {
                event.preventDefault();
                inputs[nextIndex].focus();
            }

            if (input.value.trim() === '') {
                input.classList.add('error-border');
            } else {
                input.classList.remove('error-border');
            }
        });
    }

    if (inputs.length > 0) {
        inputs[0].focus();
    }
}