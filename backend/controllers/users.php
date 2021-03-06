<?php

use ReallySimpleJWT\Token;

    require_once("models/base.php");
    require_once("models/user.php");
    require_once("models/post.php");

    // Validator
    require_once("validators/updateUserValidator.php");

    // Sanitizer
    require_once("sanitizers/sanitizer.php");

    // Image Transformer
    require_once("imageTransformer.php");
    require_once("backgroundImageTransformer.php");
    // Image Transformer
    
    $baseModel = new Base();
    $userModel = new User();
    $postModel = new Post();


    if(in_array($_SERVER["REQUEST_METHOD"], ["GET","POST"]) ) {

        $userId = $baseModel->routeRequiresValidation();

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }
    }

    if(in_array($_SERVER["REQUEST_METHOD"], ["PUT"]) ) {

        $userId = $baseModel->routeRequiresValidation();

        $userIdInted = (int)$userId;

        if(!empty($id) && $userIdInted !== $id){
            header("HTTP/1.1 403 Forbidden");
            die('{"message": "You do not have permission to perform this action "}');
       }
    }
     

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        $userCategory = "";

        if(isset($id)){  

            $userInfo = $userModel->getUserData($id);

            if(empty($userInfo)){
                die ('{"message": "User does not exist"}');
            }

            if(!empty($userInfo)){
                $userCategory = $userInfo["category"];
            }

            $userFollowersData = $userModel->getConnectedUserFollowers($id);
            $userFollowingData = $userModel->getConnectedUserFollowing($id);

            
            $similarUsersData = $userModel->getSimilarUsersToThis($userCategory, $id);


            $followersCount = $userModel->followersCount($id);
            $followingCount = $userModel->followingCount($id);

            $userPostsData = $userModel->getUserPosts($id);


            foreach ($userPostsData as $eachPost => $value) {
                $userPostsData[$eachPost]["isLiked"] = false; 
                $userPostsData[$eachPost]["isCommented"] = false; 
            }

            
            $likedPostsArray = $postModel->getUserLikedPosts($userId, $userPostsData);

            foreach ($likedPostsArray as $eachLikedPost => $value) {

                foreach ($userPostsData as $eachPost => $value) {

                    if($likedPostsArray[$eachLikedPost]["post_id"] === $userPostsData[$eachPost]["post_id"]){
                        $userPostsData[$eachPost]["isLiked"] = true;
                    }     
                }          
            }


            $commentedPostsArray = $postModel->getUserCommentedPosts($userId, $userPostsData);

            foreach ($commentedPostsArray as $eachCommentedPost => $value) {

                foreach ($userPostsData as $cadaPost => $value) {

                    if($commentedPostsArray[$eachCommentedPost]["post_id"] === $userPostsData[$cadaPost]["post_id"]){
                        $userPostsData[$cadaPost]["isCommented"] = true;
                    } 

                }
            }

            $userDataArray = array(
                'userData' => $userInfo,
                'userFollowers' => $userFollowersData,
                'userFollowing' => $userFollowingData,
                'followersCount' => $followersCount,
                'followingCount' => $followingCount,
                'userPosts' => $userPostsData,
                'similarUsers' => $similarUsersData
            );


            if(!empty($userInfo)){
                http_response_code(202);
                echo json_encode(array($userDataArray));
            }


            if(empty($userInfo) && empty($conUserFollowers) && empty($conUserFollowing)){
                http_response_code(404);
                echo '{"message": "This user does not exist"}';
            }
            
            
        } else {
            $result = $userModel->getAllUsers();
            http_response_code(202);
            echo json_encode($result);
        }
        
    }

    
    else if($_SERVER["REQUEST_METHOD"] === "POST"){
        $connectedUserId = json_decode(file_get_contents("php://input"), true);

        if(!empty($id) && !empty($connectedUserId)){

            if($id === intval($connectedUserId["userId"])){
                http_response_code(400);
                die('{"message":"Bad Request"}');
            }
            
            $result = $userModel->followUnfollow($id, $connectedUserId["userId"]);

         
            if(empty($result)){
                http_response_code(202);
                echo '{"message": "Unfollowed!"}';
            }

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "User followed!"}';
            }


        } else{
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }
    
    }


    else if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $data = json_decode(file_get_contents("php://input"), true);

        // Trim, HtmlSpecialChars and Strip tags
        $sanitizedData = sanitizer($data);
        
        $transformedData = imageTransformer($sanitizedData);

        $backgroundTransformedData = backgroundImageTransformer($sanitizedData);
          
        if(!empty($id)){

            if(updateUserValidator($sanitizedData) && 
            (!empty($transformedData["user_image"]) || !empty($backgroundTransformedData["bgUser_image"]))
            
            ){

                if(!empty($transformedData["user_image"])){
                    // Get image name from database
                    $imageName = $userModel->getImageName($id);

                    if(!empty($imageName)){
                        // Delete old image file for folder size efficiency.
                        unlink($imageName["user_image"]);
                    }
            
                    $result = $userModel->updateUserImage($id, $transformedData["user_image"]);
                
                }

                
                if(!empty($backgroundTransformedData["bgUser_image"])){

                    $bgImageName = $userModel->getBackgroundImageName($id);

                    if(!empty($bgImageName)){
                        unlink($bgImageName["background_image"]);
                    }

                    $backgroundImageResult = $userModel->updateBackgroundImage($id, $backgroundTransformedData["bgUser_image"]);
                }

                   
                if(!empty($result) || !empty($backgroundImageResult)){
                    http_response_code(202);
                        echo '{"message": " Image updated!"}';
                } 

                else {
                    http_response_code(400);
                    echo '{"message": "Something went wrong"}';
                }
 
            }
    
            else if(updateUserValidator($sanitizedData)){

                $result = $userModel->updateUserData($id, $transformedData);

                if(!empty($result)){
                    http_response_code(202);
                    echo '{"message": "Api working."}';
                } 
                else {
                    http_response_code(400);
                    echo '{"message": "Bad Request"}';
                }
                
            } else{
                http_response_code(400);
                echo '{"message": "User information not filled"}';
            }


        } else{
            http_response_code(404);
            echo '{"message": "User not found"}';
        }
        
    } 
    
    else {
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }

?>