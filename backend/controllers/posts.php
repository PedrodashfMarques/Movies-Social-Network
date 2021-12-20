<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

    require("models/post.php");
    
    require_once("validators/postValidator.php");
  
    $postModel = new Post();


    // if(in_array($_SERVER["REQUEST_METHOD"], ["POST", "PUT", "DELETE"]) ) {

    //     $userId = $postModel->routeRequiresValidation();

    //     if(empty($userId)){
    //         header("HTTP/1.1 401 Unauthorized");
    //         die('{"message":"Wrong or missing Auth Token"}');
    //     }

    //     if(!empty($id) && empty($postModel->getItemByUser($id, $userId))){
    //         header("HTTP/1.1 403 Forbidden");
    //         die('{"message": "You do not have permission to perform this action "}');
    //     }

    // }
    
    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(isset($id)){
            // $id variable from index.php
            $data = $postModel->getPost($id);

            // $postCommentsArray = $postModel->getPostComments($id);

            // countPostComments MAYBE DO

            // $postLikesCount = $postModel->countPostLikes($id);

            $postDataArray = array(
                'postData' => $data
            );

            if(!empty($data)){
                http_response_code(202);
                echo json_encode($postDataArray);
            } else {
                http_response_code(404);
                echo '{"message": "Post Not Found"}';
            }
        } else {
            http_response_code(202);
            echo json_encode($postModel->getAllPosts());

        }

    }

    else if($_SERVER["REQUEST_METHOD"] === "POST"){
        
        $data = json_decode(file_get_contents("php://input"), true);

        foreach ($data as $key => $value) {
            $data[$key] = trim(htmlspecialchars(strip_tags($value)));
        }

        if(postValidation($data)){
            $data["content"] = nl2br($data["content"]);
            
            $id = $postModel->createPost($data);

            header("HTTP/1.1 202 Accepted");

            echo '{"id": '.$id.', "message": "Success"}';
        } else{
            header("HTTP/1.1 400 Bad Request");
            echo '{"message": "Wrong Information"}';
        }
    }


    else if($_SERVER["REQUEST_METHOD"] === "PUT"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(!empty($id) && postValidation($data)){
            
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
        
    } else {
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';

    }


?>