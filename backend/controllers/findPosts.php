<?php

     require_once("models/post.php");
     require_once("sanitizers/updateUserSanitizer.php");

     $postModel = new Post();

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(!empty($sanitizedData)){
            $result = $postModel->findPosts($sanitizedData["postContentSearch"]);

            http_response_code(202);
            echo json_encode($result);
        }  
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>