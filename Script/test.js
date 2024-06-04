let answer_string = "Orange;Saft;Test1;Test2;Test3;Test4;Test5;Test6;Test8;Test9";
let answers = answer_string.split(";");

let html_code = `<div class="rating-row">`;

for (let i = 0; i < answers.length; i++) {
    console.log(answers[i]);
    if (i % 5 == 0 && i != 0) {
        html_code += `
            </div>
            <div class="rating-row">`;
    }
    html_code += `
            <div class="answer"><p>${answers[i]}</p></div>
        `;
}
html_code += "</div>";
document.getElementById("rating-box").innerHTML = html_code;

function markFalse() {
    
}