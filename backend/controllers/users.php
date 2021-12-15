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


    // function usersValidator($data){
    //     if(
    //         isset($data["user_id"]) &&
    //         isset($data["content"]) &&
    //         is_numeric($data["user_id"]) &&
    //         mb_strlen($data["content"]) >= 4 &&
    //         mb_strlen($data["content"]) <= 120
        
    //     ){
    //         foreach ($data as $key => $value) {
    //             $data[$key] = trim(htmlspecialchars(strip_tags($value)));
    //         }
    //         return true;
    //     } 
    //     return false;
    // }

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        // The id here is the user that is connected aka userId
        if(isset($id)){  

            $userInfo = $userModel->getUserData($id);

            $userFollowersData = $userModel->getConnectedUserFollowers($id);

            $userFollowingData = $userModel->getConnectedUserFollowing($id);



            $userDataArray = array(
                'UserData' => $userInfo,
                'userFollowers' => $userFollowersData,
                'userFollowing' => $userFollowingData
            );

            if(!empty($userInfo)){
                http_response_code(202);
                echo json_encode(array($userDataArray));
            }

            
            if(empty($userInfo && empty($conUserFollowers) && empty($conUserFollowing))){
                http_response_code(400);
                echo '{"message": "This user does not exist"}';
            }


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