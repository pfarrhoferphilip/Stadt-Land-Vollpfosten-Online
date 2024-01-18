/* CHANGE THIS TO YOUR SERVERS IP-ADRESS =>*/ const address = "localhost:8080"; const Protocol = "ws";


console.log(`${Protocol}://${address}`)
const socket = new WebSocket(`${Protocol}://${address}`);

socket.onopen = function (event) {
    console.log('WebSocket is connected.');
    //sendServerMessage(`${localStorage.getItem("username")} has joined the Channel.`);
};

socket.onmessage = function (event) {
    console.log(event.data);
};

function setReadyStatus(ready_status) {
    socket.send(ready_status);
}