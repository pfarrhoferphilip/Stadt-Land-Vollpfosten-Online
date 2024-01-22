<?php
require __DIR__ . '/vendor/autoload.php';

use Ratchet\MessageComponentInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Server\IoServer;
use Ratchet\WebSocket\WsServer;
use Ratchet\Http\HttpServer;

class Room
{
    public $code;
    public $players = array();
    public function __construct($code)
    {
        $this->code = $code;
    }
    public function addPlayer($p)
    {
        array_push($this->players, $p);
    }
}

class Player
{
    public $username;
    public $client;
    public function __construct($username, $client)
    {
        $this->username = $username;
        $this->client = $client;
    }
}

class ChatServer implements MessageComponentInterface
{
    protected $clients;

    protected $rooms = array();

    public function __construct()
    {

        $this->clients = new \SplObjectStorage;
        echo "Server started on Port 8080! \n";
        echo "Press Ctr+C to Quit \n";
        array_push($this->rooms, new Room(5555));
        array_push($this->rooms, new Room(4444));
    }


    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
        echo $this->clients->count() . "\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $msg_arr = explode(";", $msg);
        if ($msg_arr[0] == 0) {
            //JOIN ROOM
            if ($this->searchRoomByCode($msg_arr[1], $this->rooms) != null) {
                $current_room = $this->searchRoomByCode($msg_arr[1], $this->rooms);
                $current_room->addPlayer(new Player($msg_arr[2], $from));
                foreach ($current_room->players as $player) {

                    $player->client->send($msg_arr[2] . " joined room: " . $msg_arr[1]);

                }
            }
        } else if ($msg_arr[0] == 1) {
            //SET READY STATUS
            foreach ($this->searchRoomByCode($msg_arr[1], $this->rooms)->players as $player) {
                //if ($client !== $from) {
                $player->client->send($msg_arr[2]);
                //}
            }
        } else if ($msg_arr[0] == 2) {
            //SET USERNAME
            if ($this->searchRoomByCode($msg_arr[1], $this->rooms) != null) {
                $this->searchPlayerByClient($from, $this->searchRoomByCode($msg_arr[1], $this->rooms)->players)->username = $msg_arr[2];
                $from->send("Username updated succesfully to: " . $msg_arr[2]);
            } else {
                $from->send("Player not in a Room");
            }

        } else if ($msg_arr[0] == 3) {
            //CREATE ROOM
            $current_room = new Room($this->generateNewRoomCode());
            $current_room->addPlayer(new Player($msg_arr[1], $from));
            array_push($this->rooms, $current_room);
            $from->send("0;" . $current_room->code);
        }
    }

    public function generateNewRoomCode()
    {
        $found_code = false;
        $code = 0000;
        while ($found_code == false) {
            $code = rand(0, 9) . rand(0, 9) . rand(0, 9) . rand(0, 9);
            if ($this->searchRoomByCode($code, $this->rooms) == null) {
                $found_code = true;
            }
        }
        return $code;
    }

    public function searchPlayerByClient($client, $players)
    {
        foreach ($players as $player) {
            if ($player->client == $client) {
                return $player; // Found the room with the specified code
            }
        }
        return null;
    }

    public function searchRoomByCode($code, $rooms)
    {
        foreach ($rooms as $room) {
            if ($room->code == $code) {
                return $room; // Found the room with the specified code
            }
        }
        return null;
    }


    public function onClose(ConnectionInterface $conn)
    {
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onError(ConnectionInterface $conn, \Exception $e)
    {
        echo "An error occurred: {$e->getMessage()}\n";
        $conn->close();
    }
}

$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    8080
);

$server->run();
