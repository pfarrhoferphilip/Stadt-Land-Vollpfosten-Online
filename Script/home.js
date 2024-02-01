function joinRoom() {
    let array_string;
    var inputs = document.getElementsByClassName("room-code-input");
    var values = [];

    for (var i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
    }

    array_string = values.join("");

    console.log(array_string);

    window.open("./lobby.html?" + array_string, "_self");
}

function jumpNextField(nextInputId) {
    document.getElementById(nextInputId).focus();
}