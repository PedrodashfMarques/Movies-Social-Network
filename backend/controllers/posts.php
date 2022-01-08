<?php

    require("models/post.php");
    require_once("models/base.php");
    require_once("validators/postValidator.php");
  
    $postModel = new Post();
    $baseModel = new Base();


    if(in_array($_SERVER["REQUEST_METHOD"], ["GET","POST"]) ) {

        $userId = $baseModel->routeRequiresValidation(); 
    
        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

    }


    if(in_array($_SERVER["REQUEST_METHOD"], ["PUT", "DELETE"]) ) {

        $userId = $baseModel->routeRequiresValidation(); 

        $adminOrNot = $baseModel->adminValidation();

        if(!empty($id) && $adminOrNot !== '1' && empty($postModel->getItemByUser($id, $userId))){
            header("HTTP/1.1 403 Forbidden");
            die('{"message": "You do not have permission to perform this action "}');
        }
    }


    if($_SERVER["REQUEST_METHOD"] === "GET"){

        if(isset($id)){
            $postFound = $postModel->getPost($id);

            if(empty($postFound)){
                die ('{"message": "Post does not exist"}');
            }

            $postFound["isLiked"] = false;
            $postFound["isCommented"] = false;

            $isPostLiked = $postModel->findIfUserHasLikeInPost($userId, $postFound["post_id"]);
            $isPostCommented = $postModel->findIfUserHasCommentInPost($userId, $postFound["post_id"]);

            if($isPostLiked === true){
                $postFound["isLiked"] = true;
            }

            if($isPostCommented === true){
                $postFound["isCommented"] = true;
            }
                       

            $postDataArray = array(
                'postData' => $postFound
            );

            if(!empty($postFound)){
                http_response_code(202);
                echo json_encode($postDataArray);
            } else {
                http_response_code(404);
                echo '{"message": "Post Not Found"}';
            }


        } else {

            $oldPosts = $postModel->getAllPosts();

            foreach ($oldPosts as $cadaPost => $value) {
                $oldPosts[$cadaPost]["isLiked"] = false;
                $oldPosts[$cadaPost]["isCommented"] = false;
            }

            $likedPostsArray = $postModel->getUserLikedPosts($userId, $oldPosts);

            foreach ($likedPostsArray as $eachLikedPost => $value) {

                foreach ($oldPosts as $cadaPost => $value) {
                    
                    if($likedPostsArray[$eachLikedPost]["post_id"] === $oldPosts[$cadaPost]["post_id"]){
                        $oldPosts[$cadaPost]["isLiked"] = true;
                    }
                }
                
            }

            $commentedPostsArray = $postModel->getUserCommentedPosts($userId, $oldPosts);

            foreach ($commentedPostsArray as $eachCommentedPost => $value) {

                foreach ($oldPosts as $cadaPost => $value) {

                    if($commentedPostsArray[$eachCommentedPost]["post_id"] === $oldPosts[$cadaPost]["post_id"]){
                        $oldPosts[$cadaPost]["isCommented"] = true;
                    } 

                }
            }

            http_response_code(202);
            echo json_encode($oldPosts);

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
                http_response_code(202);
                echo json_encode($data);
            } else {
                http_response_code(400);
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
                http_response_code(202);
                echo '{"message": "Deleted ID ' .$id. '"}';

            } else{
                http_response_code(400);
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