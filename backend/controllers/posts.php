<?php

    require("models/post.php");
  
    $postModel = new Post();


    if(in_array($_SERVER["REQUEST_METHOD"], ["POST", "PUT", "DELETE"]) ) {

        $userId = $postModel->routeRequiresValidation();

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

        

    }






    function validator($data){
        if(
            isset($data["user_id"]) &&
            isset($data["content"]) &&
            is_numeric($data["user_id"]) &&
            mb_strlen($data["content"]) >= 4 &&
            mb_strlen($data["content"]) <= 120
        
        ){
            return true;
        } 
        return false;
    }

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        if(isset($id)){
            // $id variable from index.php
            $data = $postModel->getPost($id);

            if(!empty($data)){
                echo json_encode($data);
                header("HTTP/1.1 202 Accepted");
            } else {
                header("HTTP/1.1 404 Not Found");
                echo '{"message": "Not Found"}';
            }
        } else {
            // JSON Output
            echo json_encode($postModel->getAllPosts());

        }

    }

    else if($_SERVER["REQUEST_METHOD"] === "POST"){
        
        $data = json_decode(file_get_contents("php://input"), true);

        if(validator($data)){
            $id = $postModel->createPost($data);

            header("HTTP/1.1 202 Accepted");

            echo '{"id": '.$id.', "message": "Success"}';
        } else{
            header("HTTP/1.1 400 Bad Request");
            echo '{"message": "Failure"}';
        }
    }




    else if($_SERVER["REQUEST_METHOD"] === "PUT"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(!empty($id) && validator($data)){
            
            $result = $postModel->updatePost($id, $data);

            if($result){
                header("HTTP/1.1 202 Accepted");
                echo json_encode($data);
            } else {
                header("HTTP/1.1 400 Bad Request");
                echo '{"message": "Failure"}';
            }

        } else{
            header("HTTP/1.1 400 Bad Request");
            echo '{"message": "Bad Request"}';
        }
        
        
    }

    else if($_SERVER["REQUEST_METHOD"] === "DELETE"){

        if(!empty($id)){
            $result = $postModel->deletePost($id);

            if($result){
                header("HTTP/1.1 202 Accepted");
                echo '{"message": "Deleted ID ' .$id. '"}';

            } else{
                header("HTTP/1.1 400 Bad Request");
                echo '{"message": "Bad Request"}';
            }
        }

        // Existe a necessidade de perceber primeiro se o post existe antes de eliminar?
        // Porque assim , mesmo que o post n exista na base de dados com o id se eu tentar eliminar aparece a mensagem a dizer que eliminei um post inexistente

        
    }


?>