/*--- Variables ---*/
let charImgBox = document.getElementById('char-select-image-box')
let refreshImg = document.getElementById('char-select-refresh-image')
let userName = document.getElementById('char-select-username-input');
let testBox = document.getElementById('test')
let imageArray = sources.images

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

    window.open("./lobby.html?" + array_string + "?" + userName.value, "_self");
}

/*--- jumpNextInputField ---*/

function jumpNextField(nextInputId) {
    document.getElementById(nextInputId).focus();
}

/*--- CharacterSelect ---*/

console.log(imageArray);

function randomCharImg() {
    console.log(userName.value);
    charImgBox.innerHTML = `
        <img id="char-select-image-image" src="../images/characters/character-${getRandomNumberFromArray(imageArray)}.jpg">
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

function rotateImage() {
    refreshImg.style.transform = 'rotate(360deg)'; // Rotate the image 360 degrees
}