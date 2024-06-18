setTimeout(start, 1000);

let answer_string;

function displayAnswers(a_string) {
    answer_string = a_string;
    let answers = answer_string.split(',');

    let rating_box = document.getElementById('rating-box');
    rating_box.innerHTML = "";

    //answer_string = "A;Altenberg;Albanien;Attersee;Alhamdulia;Aquamarine;123;123;400;B;Berlin;Bulgarien;Bodensee;Ben;Blau;123;123;500";
    //answer_string = getAnswers(player_id);
    //let answers = answer_string.split(',');

    let box_length;
    if (gameoption === "schnell") {
        box_length = 5;
    } else if (gameoption === "normal") {
        box_length = 8;
    } else if (gameoption === "senioren") {
        box_length = 6;
    }

    let categories_count = box_length + 1;

    let str = `<tr>`;
    for (let i = 0; i < box_length; i++) {
        if (i == 0) {
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

    str += `<th>Punkte</th></tr><tr>`;

    let html_code = str + ``;

    for (let i = 0; i < answers.length; i++) {
        if (i % categories_count == 0) {
            html_code += `
            </tr>
            <tr>
                <td class="left" id="table-${i}">${answers[i]}</td>
            `;
        } else {
            html_code += `
            <td onclick="markFalse(${i})" id="table-${i}">${answers[i]}</td>
        `;
        }
    }
    html_code += "</tr>";
    rating_box.innerHTML += html_code;
}

function start() {

    getAnswers(2);
}

function markFalse(id) {
    document.getElementById('table-' + id).style.backgroundColor = "rgb(255, 60, 60)";
    document.getElementById('table-' + id).setAttribute("onclick", "javascript: markTrue(" + id + ");");
}

function markTrue(id) {
    document.getElementById('table-' + id).style.backgroundColor = "rgb(255, 255, 255)";
    document.getElementById('table-' + id).setAttribute("onclick", "javascript: markFalse(" + id + ");");
}