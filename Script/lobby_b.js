/* SERVER ADRESS =>*/ const address = "localhost:8080"; const Protocol = "ws";

let room_code;
let username = "Gast";
let players_in_room = [];
let player_id = -1;

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
    //3 = Get Player ID
    //4 = Server reboot check
    //5 = Rejoin Lobby
    //6 = Get if room exists

    let output = event.data.split(';');
    if (output[0] == 0) {
        room_code = output[1];
        localStorage['room_code'] = room_code;
        setUsername(username);
    }
    else if (output[0] == 1) {
        loadPlayers();
    }
    else if (output[0] == 2) {
        players_in_room = JSON.parse(output[1]);
        console.log(players_in_room);
        displayPlayers();
    } else if (output[0] == 3) {
        player_id = output[1];
        localStorage["player_id"] = output[1];

        //JOIN ROOM VIA URL
        joinRoomViaURL();

    } else if (output[0] == 4) {
        //REBOOT CHECK
        if (localStorage["last_start_time"]) {
            if (localStorage["last_start_time"] < output[1]) {
                localStorage.clear();
                console.log("Server restarted...")
            }
        } else {
            localStorage.clear();
            console.log("Client wasn't online before...")
        }
        localStorage["last_start_time"] = new Date().getTime();




        if (localStorage['player_id']) {
            player_id = localStorage.getItem("player_id");
        }

        if (localStorage['username']) {
            username = localStorage.getItem("username");
        }

        socket.send("6;" + player_id);


    } else if (output[0] == 5) {
        if (localStorage['room_code']) {
            room_code = localStorage['room_code'];
            
            socket.send("7;" + window.location.href.split('?')[1]);
        } else {
            joinRoomViaURL();
        }
    } else if(output[0] == 6) {
        if (output[1] == true) {
            //room exists
            joinRoomViaURL();
            
        } else {
            //room does not exist
            joinRoom(room_code);
        }
    }
    else {

        console.log(event.data);

        /*document.getElementById("output").innerHTML += `
            <p>${event.data}</p>
        `;*/

    }



};

function joinRoomViaURL() {
    splited_url = window.location.href.split('?');
    if (splited_url[1]) {
        joinRoom(splited_url[1]);
        console.log("joining room via URL...");
        localStorage['username'] = splited_url[2];
        username = splited_url[2];
        //setUsername(splited_url[2]);
    } else {
        console.log("no roomcode in URL...");
    }
}

/*PROTOCOL LIST
0: Join Room [room_code; username]
1: Send Ready Status [room_code; ready_status(true or false)]
2: Set Username [room_code; new username]
3: Create Room [username]
4: Leave Rooms
5: Get all Players in Room
6: Connect to Websocket
7: Check if Room exists [room_code]
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
    localStorage.setItem("username", username);
    socket.send("2;" + player_id + ";" + room_code + ";" + username)
}