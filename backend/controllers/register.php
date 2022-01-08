<?php

use ReallySimpleJWT\Token;

    require_once("models/user.php");

    require_once("validators/registerValidator.php");
    require_once("sanitizers/sanitizer.php");


    $userModel = new User();
    // Really Simple JWT

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(
            registerValidation($data)
        ){

            $sanitizedData = sanitizer($data);
            
            $userInfo = $userModel->registerUser($sanitizedData);

            if(empty($userInfo)){
                http_response_code(400);
                die( '{"message": "Email or Username already exists."}');
            }

            if(!empty($userInfo)){
                http_response_code(202);
                echo '{"message": "Account Created Successfully."}';
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