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

    public function removePlayer($p)
    {
        echo "removing player: " . $p . "\n";
        unset($this->players[$p]);
        foreach ($this->players as $player) {
            $player->client->send("2;" . json_encode($this->players));
        }
    }

    public function sendToAllPlayers($msg)
    {
        foreach ($this->players as $player) {
            $player->client->send($msg);
        }
    }
}

class Player
{
    public $id;
    public $username;
    public $client;
    public function __construct($username, $client, $id)
    {
        $this->username = $username;
        $this->client = $client;
        $this->id = $id;
    }

    public function setUsername($username)
    {
        $this->username = $username;
    }

    public function setClient($client) {
        $this->client = $client;
    }
}

class ChatServer implements MessageComponentInterface
{
    protected $clients;
    protected $current_player_id = 1;

    protected $rooms = array();
    protected $players = array();
    protected $server_start_date;
    

    public function __construct()
    {
        $this->server_start_date = time();
        echo "". $this->server_start_date ."\n";
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
        $conn->send("4;" . $this->server_start_date);
    }

    public function onClose(ConnectionInterface $conn)
    {
        $player = $this->searchPlayerByClient($conn, $this->players);
        if ($this->searchRoomByPlayer($player, $this->rooms) != null)
            $this->searchRoomByPlayer($player, $this->rooms)->sendToAllPlayers("1");
        $this->removePlayer($player);
        $this->clients->detach($conn);
        echo "Connection {$conn->resourceId} has disconnected\n";
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $msg_arr = explode(";", $msg);
        if ($msg_arr[0] == 0) {
            //JOIN ROOM
            if ($this->searchRoomByCode($msg_arr[1], $this->rooms) != null) {
                $player = $this->searchPlayerByClient($from, $this->players);
                $player->setUsername($msg_arr[2]);
                $this->removePlayer($player);
                if ($this->searchRoomByCode($msg_arr[1], $this->rooms) != null) {
                    $current_room = $this->searchRoomByCode($msg_arr[1], $this->rooms);
                    $current_room->addPlayer($player);
                    $from->send("0;" . $current_room->code);
                    foreach ($current_room->players as $player) {

                        $player->client->send("1;" . $msg_arr[2]);

                    }
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
                $this->searchPlayerByClient($from, $this->searchRoomByCode($msg_arr[1], $this->rooms)->players)->setUsername($msg_arr[2]);
                $this->searchRoomByCode($msg_arr[1], $this->rooms)->sendToAllPlayers("1");
                $from->send("Username updated succesfully to: " . $msg_arr[2]);
            } else {
                $from->send("Player not in a Room");
            }

        } else if ($msg_arr[0] == 3) {
            //CREATE ROOM
            $current_room = new Room($this->generateNewRoomCode());
            $player = $this->searchPlayerByClient($from, $this->players);
            $player->setUsername($msg_arr[1]);
            $this->removePlayer($player);
            $current_room->addPlayer($player);
            array_push($this->rooms, $current_room);
            $from->send("0;" . $current_room->code);
        } else if ($msg_arr[0] == 4) {
            //LEAVE ALL ROOMS
            $this->removePlayer($this->searchPlayerByClient($from, $this->players));
            $from->send("Left all Rooms.");
        } else if ($msg_arr[0] == 5) {
            //GET ALL PLAYERS IN ROOM
            $player_array = $this->searchRoomByCode($msg_arr[1], $this->rooms)->players;
            $from->send("2;" . json_encode($player_array));
        } else if ($msg_arr[0] == 6) { 
            //Connect to Websocket
            if ($msg_arr[1] == -1) {
             
                array_push($this->players, new Player("Gast", $from, $this->current_player_id));
                $from->send("3;" . $this->current_player_id);
                $this->current_player_id++;
                echo $this->current_player_id . " current Player id";
            } else if ($this->searchPlayerById($msg_arr[1], $this->players)) {
                $curr_player = $this->searchPlayerById($msg_arr[1], $this->players);
                $curr_player->setClient($from);
                $from->send("5");
                $from->send("Player reconnected");
            }
            
        }
    }

    public function searchPlayerById($id, $players) {
        foreach ($players as $player) {
            if ($player->id == $id) {
                return $player; // Found the room with the specified code
            }
        }
        return null;
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

    public function removePlayer($p)
    {
        foreach ($this->rooms as $room) {
            if (in_array($p, $room->players)) {
                $key = array_search($p, $room->players);
                $room->removePlayer($key);
                echo "Removed Player: " . $p->username . " from room: " . $room->code . "\n";
            }
            if (count($room->players) == 0) {
                $this->removeRoom($room);
                echo "Removed Room: " . $room->code . "\n";
            }
        }
    }

    public function removeRoom($r)
    {
        $key = array_search($r, $this->rooms);
        unset($this->rooms[$key]);
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

    public function searchRoomByPlayer($player, $rooms)
    {
        foreach ($rooms as $room) {
            foreach ($room->players as $p) {
                if ($player == $p) {
                    return $room;
                }
            }
        }
        return null;
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
