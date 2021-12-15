<?php

use ReallySimpleJWT\Token;

    require_once("models/user.php");
    require_once("models/base.php");

    $userModel = new User();

    $baseModel = new Base();


    // if(in_array($_SERVER["REQUEST_METHOD"], ["POST", "PUT", "DELETE"]) ) {

    //     $userId = $baseModel->routeRequiresValidation();
    //     // Validation

    //     if(empty($userId)){
    //         header("HTTP/1.1 401 Unauthorized");
    //         die('{"message":"Wrong or missing Auth Token"}');
    //     }

    //     if(!empty($id) && empty($postModel->getItemByUser($id, $userId))){
    //         header("HTTP/1.1 403 Forbidden");
    //         die('{"message": "You do not have permission to perform this action "}');
    //     }

    // }


    function usersValidator($data){
        if(
            isset($data["user_id"]) &&
            isset($data["content"]) &&
            is_numeric($data["user_id"]) &&
            mb_strlen($data["content"]) >= 4 &&
            mb_strlen($data["content"]) <= 120
        
        ){
            foreach ($data as $key => $value) {
                $data[$key] = trim(htmlspecialchars(strip_tags($value)));
            }
            return true;
        } 
        return false;
    }

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        // The id here is the user that is connected aka userId
        if(isset($id) && is_numeric($id)){   

            $conUserFollowers = $userModel->getConnectedUserFollowers($id);

            $conUserFollowing = $userModel->getConnectedUserFollowing($id);

            // $userFollowersData = $userModel->getUserData($id);

        }
        
    }


    else if($_SERVER["REQUEST_METHOD"] === "POST"){

        $connectedUserId = json_decode(file_get_contents("php://input"), true);

        if(!empty($id) && 
            !empty($connectedUserId) && 
            is_numeric($id) && 
            is_numeric($connectedUserId["userId"])){

            if($id === intval($connectedUserId["userId"])){
                http_response_code(400);
                die('{"message":"Bad Request"}');
            }
            
            $result = $userModel->followUnfollow($id, $connectedUserId);

         
            if(empty($result)){
                http_response_code(202);
                echo '{"message": "Unfollowed!"}';
            }

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "User followed!"}';
            }


        }
    
    }


?>