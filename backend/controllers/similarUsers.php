<?php
     require_once("models/base.php");
     require_once("models/user.php");

     $userModel = new User();

     $userSmallBio = "Junior Web Developer";

     $userBigBio = "Junior Web Developer trying to get my first job as well as semi professional CSGO Player trying to reach the highest possible in the Portuguese Scene.";

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(!empty($userId)){
            $result = $userModel->getSimilarUsers($userSmallBio, $userBigBio);

            // Colocar este controller no array no index.php

            if(!empty($result)){
                

            } else {
                
            }

        }
        // Aplicar logica

    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>