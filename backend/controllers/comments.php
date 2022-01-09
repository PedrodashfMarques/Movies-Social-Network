<?php

    require("models/comment.php");
    require_once("sanitizers/sanitizer.php");

    $commentModel = new Comment();

    if(in_array($_SERVER["REQUEST_METHOD"], ["POST"]) ) {

        $userId = $baseModel->routeRequiresValidation(); 
    
        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token."}');
        }

    }


    if(in_array($_SERVER["REQUEST_METHOD"], ["PUT", "DELETE"]) ) {

        $userId = $baseModel->routeRequiresValidation(); 

        $adminOrNot = $baseModel->adminValidation();

        if(!empty($id) && $adminOrNot !== '1' && empty($commentModel->getItemByUser($id, $userId))){
            header("HTTP/1.1 403 Forbidden");
            die('{"message": "You do not have the permission to perform this action."}');
        }
    }


    if($_SERVER["REQUEST_METHOD"] === "GET"){
        if(isset($id)){
            $data = $commentModel->getPostComments($id);

            $postComments = array(
                'postComments' => $data
            );

            if(!empty($data)){

                http_response_code(202);
                echo json_encode($postComments);
            } else {
                http_response_code(202);
                echo '{"message": "Comments Not Found"}';
            }
        } else {
            $allComments = $commentModel->getAllComments();
            http_response_code(202);
            echo json_encode($allComments);
            
        }
    }


    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(
            isset($sanitizedData["postId"]) &&
            isset($sanitizedData["content"]) &&
            is_numeric(intval($sanitizedData["postId"])) &&
            mb_strlen($sanitizedData["content"]) >= 2 &&
            mb_strlen($sanitizedData["content"]) <= 1000
        ){
            $result = $commentModel->commentPost($sanitizedData, $userId);

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "Comment posted!" }';

            } else{
                http_response_code(400);
                echo '{"message": "Information not provided" }';
            }


        } else {
            http_response_code(400);
            echo '{"message": "Wrong information" }';
        }
        
    }

    if($_SERVER["REQUEST_METHOD"] === "PUT"){

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(
            !empty($id) && 
            isset($sanitizedData["content"]) &&
            mb_strlen($sanitizedData["content"]) >= 2 &&
            mb_strlen($sanitizedData["content"]) <= 1000){
     
            $result = $commentModel->updateComment($id, $sanitizedData);

            if($result){
                http_response_code(202);
                echo '{"message": "Comment Edited" }';

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

?>