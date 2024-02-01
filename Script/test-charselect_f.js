//  html boxes
let charImgBox = document.getElementById('char-select-image-box')
let refreshImg = document.getElementById('char-select-refresh-image')
let testBox = document.getElementById('test')
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