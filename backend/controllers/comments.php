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

            } else{
                http_response_code(400);
                echo '{"message": "Information not provided" }';
            }


        } else {
            http_response_code(400);
            echo '{"message": "Bad Request" }';
        }
        
        

    }

    if($_SERVER["REQUEST_METHOD"] === "PUT"){

        $data = json_decode(file_get_contents("php://input"), true);
        
        foreach ($data as $key => $value) {
            $data[$key] = trim(htmlspecialchars(strip_tags($value)));
        }

        if(
            !empty($id) && 
            isset($data["content"]) &&
            mb_strlen($data["content"]) >= 2 &&
            mb_strlen($data["content"]) <= 1000){
     
            $result = $commentModel->updateComment($id, $data);

            if($result){
                http_response_code(202);
                echo json_encode($data);
            }

            if(empty($result)){
                http_response_code(404);
                echo '{"message": "Comment does not exist" }';
                
            }


        } else{
            http_response_code(400);
            echo '{"message": "Bad Request" }';
        }

    }


    if($_SERVER["REQUEST_METHOD"] === "DELETE"){

        if(!empty($id)){
            $result = $commentModel->deleteComment($id);

            if($result){
                header("HTTP/1.1 202 Accepted");
                echo '{"message": "Deleted comment ' .$id. '"}';

            }
            if(empty($result)){
                http_response_code(404);
                echo '{"message": "Comment does not exist"}';
            }
        } else {
            http_response_code(400);
                echo '{"message": "Bad Request"}';
        }


    }


        // Comment Delete Functionality
    

?>