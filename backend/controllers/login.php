<?php

use ReallySimpleJWT\Token;

    require_once("models/user.php");
    require_once("sanitizers/sanitizer.php");

    $userModel = new User();
    // Really Simple JWT

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(
            !empty($sanitizedData) &&
            !empty($sanitizedData["email"]) &&
            !empty($sanitizedData["password"]) &&
            mb_strlen($sanitizedData["email"]) <= 30 &&
            mb_strlen($sanitizedData["password"]) <= 1000
        ){
            $userInfo = $userModel->login($sanitizedData);

            if(empty($userInfo)){
                header("HTTP/1.1 400 Bad Request");
                die( '{"message": "Incorrect login information"}');
            }

            $payload = [
                "userId" => $userInfo["user_id"],
                "username" => $userInfo["username"],
                "firstName" => $userInfo["first_name"],
                "lastName" => $userInfo["last_name"],
                "location" => $userInfo["location"],
                "smallBio" => $userInfo["small_bio"],
                "bigBio" => $userInfo["big_bio"],
                "userImage" => $userInfo["user_image"],
                "backgroundImage" => $userInfo["background_image"],
                "isAdmin" => $userInfo["is_admin"],
                "isVerified" => $userInfo["is_verified"],
                "expiryTime" => 3600
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