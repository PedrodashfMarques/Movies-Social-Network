<?php

    header("Access-Control-Allow-Origin: *");
    header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
    header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("models/user.php");

    $userModel = new User();
    
    if(in_array($_SERVER["REQUEST_METHOD"], ["GET"]) ) {

        $userId = $baseModel->routeRequiresValidation();

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

    }

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(!empty($id) && 
        !empty($userId) && 
        is_numeric($id) && 
        is_numeric($userId)){
       
            if($id === intval($userId)){
                http_response_code(400);
                die('{"message":"Users cannot be the same"}');
            }
            
            $result = $userModel->checkIfUserAlreadyFollowing($id, $userId);

        
            if(empty($result)){
                http_response_code(202);
                echo '{"message": "Not Following"}';
            }

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "Already Following"}';
            }

        }
    } 


    else {
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';

    }


?>