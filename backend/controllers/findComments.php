<?php

     require_once("models/comment.php");
     require_once("sanitizers/sanitizer.php");

     $commentModel = new Comment();

    if($_SERVER["REQUEST_METHOD"] === "POST"){

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