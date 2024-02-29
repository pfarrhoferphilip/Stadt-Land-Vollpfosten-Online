/*--- Variables ---*/

let charImgBox = document.getElementById('char-select-image-box')
let refreshImg = document.getElementById('char-select-refresh-image')
let testBox = document.getElementById('test')
let diceBox = document.getElementById('char-select-username-dice-box')
let userName = document.getElementById('char-select-username-input')
let animationInterval;
let animationFrames = [];
let currentFrameIndex = 0;

let imageArray = sources.images

console.log(lobby_bs)

randomCharImg();

/*--- JoinRoom() ---*/
function joinRoom() {
    let array_string;
    var inputs = document.getElementsByClassName("room-code-input");
    var values = [];

    for (var i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
    }

    array_string = values.join("");

    console.log(array_string);

    // Wert in localStorage speichern
    localStorage['username'] = userName.value;

    // Zum Testen können Sie den gespeicherten Wert auslesen und in der Konsole ausgeben
    let storedUsername = localStorage.getItem('username');
    console.log('Gespeicherter Benutzername:', storedUsername);

    window.open("./lobby.html?" + array_string, "_self");
}

function createRoom() {
    localStorage['username'] = userName.value;

    window.open("./lobby.html?createRoom", "_self");
}

/*--- HandleInputFields ---*/

function handleInput(inputElement, nextInputId) {
    inputElement.value = inputElement.value.replace(/[^0-9]/g, '');
    if (nextInputId && inputElement.value.length === inputElement.maxLength) {
        jumpNextField(nextInputId);
    }
}

function handleBackspace(inputElement, prevInputId) {
    if (event.key === "Backspace" && inputElement.value.length === 0 && prevInputId) {
        jumpNextField(prevInputId);
    }
}

function jumpNextField(nextInputId) {
    document.getElementById(nextInputId).focus();
}

/*--- jumpNextInputField ---*/

function jumpNextField(nextInputId) {
    document.getElementById(nextInputId).focus();
}

/*--- CharacterSelect ---*/

console.log(imageArray);

function randomCharImg() {
    localStorage['image_id'] = getRandomNumberFromArray(imageArray);
    charImgBox.innerHTML = `
        <img id="char-select-image-image" src="../images/characters/character-${localStorage['image_id']}.jpg">
    `
}

function getRandomNumberFromArray(array) {
    if (!Array.isArray(array) || array.length === 0) {
        return "Invalid array";
    }
    if (!getRandomNumberFromArray.previousIndex) {
        getRandomNumberFromArray.previousIndex = -1; // Initialize with an invalid index
    }
    let randomIndex;
    do {
        randomIndex = Math.floor(Math.random() * array.length) + 1;
    } while (randomIndex === getRandomNumberFromArray.previousIndex);
    getRandomNumberFromArray.previousIndex = randomIndex;
    return randomIndex;
}

/*--- RandomName ---*/

function getRandomName() {
    // Zufällige Auswahl eines firstpart-Namens
    let randomFirstPart = names.firstpart[Math.floor(Math.random() * names.firstpart.length)].name;

    // Zufällige Auswahl eines secondpart-Namens
    let randomSecondPart = names.secondpart[Math.floor(Math.random() * names.secondpart.length)].name;

    // Zusammensetzen der beiden Teile
    let randomName = `${randomFirstPart}${randomSecondPart}`;

    userName.value = randomName;

    console.log(randomName);
}