<?php
     require_once("models/base.php");
     require_once("models/user.php");

     $userModel = new User();

     $userSmallBio = "Junior Web Developer";

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(!empty($userId)){
            $result = $userModel->getSimilarUsers($userSmallBio);

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