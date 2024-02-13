<?php
require 'connexionDB.php';

//use functions.php to get the functions
require 'functions.php';

$method = $_SERVER["REQUEST_METHOD"];

switch ($method) {
    case 'GET':
        if (isset($_GET["id"])) {
            $id = $_GET["id"];
            $fact = getFactById($id, $conn);
            echo json_encode($fact);
        } else {
            $facts = getFacts($conn);
            echo json_encode($facts);
        }
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $response = addFact($data, $conn);
        header('HTTP/1.1 201 Created');
        echo json_encode($response);
        break;
    case 'PUT':
        $id = $_GET["id"];
        $data = json_decode(file_get_contents("php://input"), true);
        $response = updateFact($id, $data, $conn);
        echo json_encode($response);
        break;
    case "PATCH":
        // Update one or more fields of a fact with a given ID
        $id = $_GET["id"];
        $data = json_decode(file_get_contents("php://input"), true);
        $response = updateFactPatch($id, $data, $conn);
        echo json_encode($response);
        break;
    case 'DELETE':
        $id = $_GET["id"];
        $response = deleteFact($id, $conn);
        echo json_encode($response);
        break;


    default:
        if (isset($_SERVER["X-WHS-LIKE"])) {
            header("HTTP/1.1 403 Forbidden");
            exit();
        } else {
            header('HTTP/1.1 405 Method Not Allowed');
            exit();
        }
        break;
}

$conn = null; // Close the connection when done.
exit();