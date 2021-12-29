<?php
     require_once("models/base.php");
     require_once("models/user.php");

     $userModel = new User();

        $userId = 1;

        $userCategory = "Web Development";
     

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(!empty($userId)){
            $usersArray = $userModel->getSimilarUsersToThis($userCategory, $userId);

            // Colocar este controller no array no index.php

            if(!empty($usersArray)){
                http_response_code(202);
                echo json_encode($usersArray);

            } else {
                http_response_code(404);
                echo '{"message": "Users not found"}';    
            }

        }

    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>