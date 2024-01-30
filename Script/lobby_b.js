/* SERVER ADRESS =>*/ const address = "localhost:8080"; const Protocol = "ws";

let room_code;
let username = "Gast";
let players_in_room = [];

//CONNECT TO Server.php
console.log(`Establishing connection to Websocket: ${Protocol}://${address}`)
const socket = new WebSocket(`${Protocol}://${address}`);
socket.onopen = function (event) {
    console.log('WebSocket is connected.');
    //sendServerMessage(`${localStorage.getItem("username")} has joined the Channel.`);
};

//HANDLE MESSAGES SENT FROM SERVER
socket.onmessage = function (event) {
    console.log(event.data);

    //0 = set room code
    //1 = Player joined Room
    //2 = Get all Players in current Room

    let output = event.data.split(';');
    if (output[0] == 0) {
        room_code = output[1];
    } 
    else if (output[0] == 1) {
        loadPlayers();
    } 
    else if (output[0] == 2) {
        players_in_room = JSON.parse(output[1]);
        console.log(players_in_room);
        displayPlayers();
    }
    else {

        console.log(event.data);

        /*document.getElementById("output").innerHTML += `
            <p>${event.data}</p>
        `;*/

    }



};

/*PROTOCOL LIST
0: Join Room [room_code; username]
1: Send Ready Status [room_code; ready_status(true or false)]
2: Set Username [room_code; new username]
3: Create Room [username]
4: Leave Rooms
5: Get all Players in Room
*/

//DISPLAY ALL PLAYERS IN CURRENT ROOM
function displayPlayers() {
    console.log("Displaying Players...")
    let html_code = "";
    for (let i = 0; i < Object.keys(players_in_room).length; i++) {
        console.log(players_in_room[Object.keys(players_in_room)[i]]);
        html_code += `
            <p>${players_in_room[Object.keys(players_in_room)[i]].username}</p>
        `;
    }
    document.getElementById("players").innerHTML = html_code;
}

//CREATE A ROOM
function createRoom() {
    socket.send("3;" + username);
}

//JOIN A ROOM
function joinRoom(code) {
    socket.send("0;" + code + ";" + username);
}

function leaveRoom() {
    socket.send("4");
}

function loadPlayers() {
    socket.send("5;" + room_code);
}

//READY UP AND NOTIFY ALL OTHER PLAYERS
function setReadyStatus() {
    let message = "1;" + room_code + ";" + document.getElementById("message").value;
    socket.send(message);
}

//SET USERNAME AND NOTIFY ALL OTHER PLAYERS
function setUsername(name) {
    //username = document.getElementById("username").value;
    username = name;
    socket.send("2;" + room_code + ";" + username)
}