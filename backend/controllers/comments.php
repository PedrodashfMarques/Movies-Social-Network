<?php

    require("models/comment.php");

    $commentModel = new Comment();

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        // GET para ir buscar todos os comments relativos ao post $id

    }


    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        foreach ($data as $key => $value) {
            $data[$key] = trim(htmlspecialchars(strip_tags($value)));
        }
        if(
            isset($data["postId"]) &&
            isset($data["userId"]) &&
            isset($data["content"]) &&
            is_numeric(intval($data["postId"])) &&
            is_numeric(intval($data["userId"])) &&
            mb_strlen($data["content"]) >= 2 &&
            mb_strlen($data["content"]) <= 1000
        ){
            $result = $commentModel->commentPost($data);

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "Comment posted!" }';

            }


        } else {
            http_response_code(400);
            echo '{"message": "Bad Request" }';
        }
        
        

    }

    if($_SERVER["REQUEST_METHOD"] === "PUT"){}


    if($_SERVER["REQUEST_METHOD"] === "DELETE"){}


        // Comment Functionality
    

?>