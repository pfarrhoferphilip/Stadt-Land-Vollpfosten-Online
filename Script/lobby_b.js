/* SERVER ADRESS =>*/ const address = "localhost:8080"; const Protocol = "ws";

let room_code;
let username = "Gast";

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

    let output = event.data.split(';');
    if (output[0] == 0) {
        room_code = output[1];
    } else {

        document.getElementById("output").innerHTML += `
            <p>${event.data}</p>
        `;

    }



};

/*PROTOCOL LIST
0: Join Room [room_code; username]
1: Send Ready Status [room_code; ready_status(true or false)]
2: Set Username [room_code; new username]
3: Create Room [username]
4: Leave Rooms
*/

//CREATE A ROOM
function createRoom() {
    socket.send("3;" + username);
}

//JOIN A ROOM
function joinRoom() {
    socket.send("0;" + document.getElementById("room-code").value + ";" + username);
}

function leaveRoom() {
    socket.send("4");
}

//READY UP AND NOTIFY ALL OTHER PLAYERS
function setReadyStatus() {
    let message = "1;" + room_code + ";" + document.getElementById("message").value;
    socket.send(message);
}

//SET USERNAME AND NOTIFY ALL OTHER PLAYERS
function setUsername() {
    username = document.getElementById("username").value;
    socket.send("2;" + room_code + ";" + username)
}