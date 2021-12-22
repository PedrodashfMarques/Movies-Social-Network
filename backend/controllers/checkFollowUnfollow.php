<?php

    require("models/user.php");

    $userModel = new User();

    // if($_SERVER["REQUEST_METHOD"] === "GET"){}
    
    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $connectedUserId = json_decode(file_get_contents("php://input"), true);

        if(!empty($id) && 
            !empty($connectedUserId) && 
            is_numeric($id) && 
            is_numeric($connectedUserId["userId"])){

            if($id === intval($connectedUserId["userId"])){
                http_response_code(400);
                die('{"message":"Bad Request"}');
            }
            
            $result = $userModel->checkIfUserAlreadyFollowing($id, $connectedUserId["userId"]);

         
            if(empty($result)){
                http_response_code(202);
                echo '{"message": "Not Following"}';
            }

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "Already Following"}';
            }


        } else{
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }

    }


?>