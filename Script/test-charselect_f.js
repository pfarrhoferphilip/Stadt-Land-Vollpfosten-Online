//  html boxes
let charImgBox = document.getElementById('char-select-image-box')
let refreshImg = document.getElementById('char-select-refresh-image')
let testBox = document.getElementById('test')
let diceBox = document.getElementById('char-select-username-dice-box')
let inputBox = document.getElementById('char-select-username-input')
//  variables

let imageArray = sources.images

console.log(imageArray);


function randomCharImg() {
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
function throwsDice() {
    let random = Math.floor(Math.random() * 6) + 1
    diceBox.innerHTML = `
        <img id = "char-select-username-dice-image" src = "../images/dices/dice${random}.png" alt = "dice" onclick = "throwsDice()">
    `
    console.log(names);
    let randomFirst = names.firstpart[getRandomNumberFromArray(names.firstpart)].name;
    let randomSecond = names.secondpart[getRandomNumberFromArray(names.secondpart)].name;
    
    inputBox.value = randomFirst + " " + randomSecond
}