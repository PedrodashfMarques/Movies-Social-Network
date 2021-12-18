<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

use ReallySimpleJWT\Token;

    require_once("models/user.php");
    require_once("models/base.php");

    require_once("validators/updateUserValidator.php");


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

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        // The id here is the user that is connected aka userId
        if(isset($id)){  

            $userInfo = $userModel->getUserData($id);

            $userFollowersData = $userModel->getConnectedUserFollowers($id);

            $userFollowingData = $userModel->getConnectedUserFollowing($id);

            $followersCount = $userModel->followersCount($id);
            $followingCount = $userModel->followingCount($id);

            $userPostsData = $userModel->getUserPosts($id);

            $userDataArray = array(
                'userData' => $userInfo,
                'userFollowers' => $userFollowersData,
                'userFollowing' => $userFollowingData,
                'followersCount' => $followersCount,
                'followingCount' => $followingCount,
                'userPosts' => $userPostsData
            );

            if(!empty($userInfo)){
                http_response_code(202);
                echo json_encode(array($userDataArray));
            }

            
            if(empty($userInfo && empty($conUserFollowers) && empty($conUserFollowing))){
                http_response_code(404);
                echo '{"message": "This user does not exist"}';
            }
        } else {
            // Aplicar lógica para ir buscar todos os utilizadores para listar no World Component
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


        } else{
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }
    
    }

    else if($_SERVER["REQUEST_METHOD"] === "PUT"){
        $data = json_decode(file_get_contents("php://input"), true);

        foreach ($data as $key => $value) {
            $data[$key] = trim(htmlspecialchars(strip_tags($value)));
        }

        if(!empty($id) && updateUserValidator($data)){

            if(!empty($data["userImage"])){
                $binario = base64_decode($data["userImage"]);
                $filename = date("Ymd") . "_" . bin2hex(random_bytes(4));
                file_put_contents("user-profile-images/" . $filename . ".jpg" , $binario);

                // Criar nova function para updateUserProfileImage e criar ainda outra function para updateBackgroundImage
                // $result = $userModel->updateUserData($id, $data);

            }


            $result = $userModel->updateUserData($id, $data);

            http_response_code(202);
            echo '{"message": "Api working!"}';

        } else {
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }
        
        
    }


?>