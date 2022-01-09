<?php

     require_once("models/comment.php");
     require_once("sanitizers/sanitizer.php");

     $commentModel = new Comment();

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $userId = $baseModel->routeRequiresValidation();

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(!empty($sanitizedData)){
            $commentsFound = $commentModel->findComments($sanitizedData["commentContentSearch"]);

            http_response_code(202);
            echo json_encode($commentsFound);
        }  
   
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>