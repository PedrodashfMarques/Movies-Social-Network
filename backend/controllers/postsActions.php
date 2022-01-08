<?php

    require("models/post.php");

    $postModel = new Post();

    if(in_array($_SERVER["REQUEST_METHOD"], ["POST"]) ) {

        $userId = $baseModel->routeRequiresValidation(); 
    
        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token."}');
        }

    }

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(!empty($data) && intval($data["postId"])){
            
            $postId = $data["postId"];
            
            $result = $postModel->togglePostLike($postId, $userId);

            http_response_code(202);
            echo '{
                "liked": '.($result ? "true" : "false").'
            }';
        }

    } else{
        http_response_code(405);
        echo '{"message":"Method not allowed."}';

    }


?>