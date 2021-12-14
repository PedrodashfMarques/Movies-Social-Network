<?php

use ReallySimpleJWT\Token;

    require_once("models/user.php");

    $userModel = new User();
    // Really Simple JWT

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(
            !empty($data) &&
            !empty($data["firstName"]) &&
            !empty($data["userName"]) &&
            !empty($data["lastName"]) &&
            !empty($data["email"]) &&
            !empty($data["password"]) &&
            !empty($data["confirmPassword"]) &&
            mb_strlen($data["firstName"]) >= 3 &&
            mb_strlen($data["firstName"]) <= 30 &&
            mb_strlen($data["userName"]) >= 3 &&
            mb_strlen($data["userName"]) <= 30 &&
            mb_strlen($data["lastName"]) >= 3 &&
            mb_strlen($data["lastName"]) <= 30 &&
            mb_strlen($data["email"]) >= 5 &&
            mb_strlen($data["email"]) <= 252 &&
            mb_strlen($data["password"]) >= 6 &&
            mb_strlen($data["password"]) <= 1000 &&
            mb_strlen($data["confirmPassword"]) >= 6 &&
            mb_strlen($data["confirmPassword"]) <= 1000 &&
            filter_var($data["email"], FILTER_VALIDATE_EMAIL) &&
            $data["password"] === $data["confirmPassword"]

        ){
            foreach ($data as $key => $value) {
                $data[$key] = trim(htmlspecialchars(strip_tags($value)));
            }
            
            $userInfo = $userModel->registerUser($data);

            if(empty($userInfo)){
                http_response_code(400);
                die( '{"message": "Email already exists"}');
            }

            if(!empty($userInfo)){
                http_response_code(202);
                echo '{"message": "Account Created Successfully"}';
            }

        
        } else {
            // http_response_code();
            header("HTTP/1.1 400 Bad Request");
            echo '{"message": "Wrong information"}';
        }


    } else{
        header("HTTP/1.1 405 Method Not Allowed");
        echo '{"message": "This method is not allowed"}';
    }


?>