/* CHANGE THIS TO YOUR SERVERS IP-ADRESS =>*/ const address = "localhost:8080"; const Protocol = "ws";

let room_code;
setRoomCode();

function setRoomCode() {
    room_code = document.getElementById("room-code").value;
    console.log("Set new Room Code: " + room_code);
}

console.log(`${Protocol}://${address}`)
const socket = new WebSocket(`${Protocol}://${address}`);

socket.onopen = function (event) {
    console.log('WebSocket is connected.');
    //sendServerMessage(`${localStorage.getItem("username")} has joined the Channel.`);
};

socket.onmessage = function (event) {
    console.log(event.data);
};

function joinRoom() {
    socket.send("0;" + room_code);
}

function setReadyStatus(ready_status) {
    let message = "1;" + room_code + ";" + ready_status;
    socket.send(message);
}