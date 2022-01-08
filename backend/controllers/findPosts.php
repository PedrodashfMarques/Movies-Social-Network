<?php

     require_once("models/post.php");
     require_once("sanitizers/sanitizer.php");

     $postModel = new Post();

     

     $userId = 1;



    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(!empty($sanitizedData)){
            $postsFound = $postModel->findPosts($sanitizedData["postContentSearch"]);

            // Fazer o foreach para os isLiked e isCommented (igual ao que tenho no posts controller)
            foreach ($postsFound as $eachPost => $value) {
                $postsFound[$eachPost]["isLiked"] = false;
                $postsFound[$eachPost]["isCommented"] = false;
            }

            $likedPostsArray = $postModel->getUserLikedPosts($userId, $postsFound);

            foreach ($likedPostsArray as $eachLikedPost => $value) {

                foreach ($postsFound as $cadaPost => $value) {
                    
                    if($likedPostsArray[$eachLikedPost]["post_id"] === $postsFound[$cadaPost]["post_id"]){
                        $postsFound[$cadaPost]["isLiked"] = true;
                    }
                }
                
            }

            $commentedPostsArray = $postModel->getUserCommentedPosts($userId, $postsFound);

            foreach ($commentedPostsArray as $eachCommentedPost => $value) {

                foreach ($postsFound as $cadaPost => $value) {

                    if($commentedPostsArray[$eachCommentedPost]["post_id"] === $postsFound[$cadaPost]["post_id"]){
                        $postsFound[$cadaPost]["isCommented"] = true;
                    } 

                }
            }

            http_response_code(202);
            echo json_encode($postsFound);
        }  

       
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>