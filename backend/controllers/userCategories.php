<?php
     require_once("models/base.php");
     require_once("models/user.php");

     $userModel = new User();

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        $result = $userModel->getCategories();

        if(!empty($result)){
            http_response_code(202);
            echo json_encode($result);
        }

        if(empty($result)){
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>