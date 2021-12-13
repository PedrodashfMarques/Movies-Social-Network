<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: PUT, GET, POST");
// header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

use ReallySimpleJWT\Token;

    require_once("models/user.php");

    $userModel = new User();
    // Really Simple JWT

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(
            !empty($data) &&
            !empty($data["email"]) &&
            !empty($data["password"]) &&
            mb_strlen($data["email"]) <= 30 &&
            mb_strlen($data["password"]) <= 1000
        ){
            $userInfo = $userModel->login($data);

            if(empty($userInfo)){
                header("HTTP/1.1 400 Bad Request");
                die( '{"message": "Incorrect login information"}');
            }

            $payload = [
                "userId" => $userInfo["user_id"],
                "username" => $userInfo["username"],
                "firstName" => $userInfo["first_name"],
                "lastName" => $userInfo["last_name"],
                "expiryTime" => time()
            ];

            $secret = CONFIG["SECRET_KEY"];

            $token = Token::customPayload($payload, $secret);

            header("X-Auth-Token: " . $token);

            echo '{"X-Auth-Token" : "'. $token .'"}';


        
        } else {
            header("HTTP/1.1 400 Bad Request");
            echo '{"message": "Wrong information"}';
        }


    } else{
        header("HTTP/1.1 405 Method Not Allowed");
        echo '{"message": "This method is not allowed"}';
    }


?>