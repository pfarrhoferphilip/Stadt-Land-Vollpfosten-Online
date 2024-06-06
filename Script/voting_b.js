let answer_string = "A;Altenberg;Albanien;Attersee;Alhamdulia;Aquamarine;B;Berlin;Bulgarien;Bodensee;Ben;Blau";
let answers = answer_string.split(";");

let categories_count = 6
let rating_box = document.getElementById('rating-box')
let html_code = `<tr`;

for (let i = 0; i < answers.length; i++) {
    console.log(answers[i]);
    if (i % categories_count == 0) {
        html_code += `
            </tr>
            <tr>
                <td class="left" id="table-${i}">${answers[i]}</td>
            `;
    }else{
        console.log(i);
        html_code += `
            <td onclick="markFalse(${i})" id="table-${i}">${answers[i]}</td>
        `;
    }
}
html_code += "</tr>";
rating_box.innerHTML += html_code;

function markFalse(id) {
    document.getElementById('table-' + id).style.backgroundColor = "rgb(255, 60, 60)"
    document.getElementById('table-' + id).setAttribute("onclick", "javascript: markTrue(" + id + ");")
}
function markTrue(id) {
    document.getElementById('table-' + id).style.backgroundColor = "rgb(255, 255, 255)"
    document.getElementById('table-' + id).setAttribute("onclick", "javascript: markFalse(" + id + ");")
}