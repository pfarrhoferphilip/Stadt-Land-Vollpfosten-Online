function getInputValues() {
    var inputs = document.getElementsByClassName("room-code-input");
    var values = [];

    for (var i = 0; i < inputs.length; i++) {
        values.push(inputs[i].value);
    }

    console.log(values);
}