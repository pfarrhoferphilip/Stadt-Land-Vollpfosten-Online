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
    }


    public function onOpen(ConnectionInterface $conn)
    {
        $this->clients->attach($conn);
        echo "New connection! ({$conn->resourceId})\n";
        echo $this->clients->count();
    }

    public function onMessage(ConnectionInterface $from, $msg)
    {
        $msg_arr = explode(";", $msg);
        echo $msg;
        if ($msg_arr[0] == 0) {
            //JOIN ROOM
            if ($this->searchRoomByCode($msg_arr[1], $this->rooms) != null) {
                foreach ($this->clients as $client) {

                    $client->send("joined room: " . $msg_arr[1]);

                }
            }
        } else if ($msg_arr[0] == 1) {
            //SET READY STATUS
            foreach ($this->clients as $client) {
                //if ($client !== $from) {
                $client->send($msg_arr[1]);
                //}
            }
        }

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
