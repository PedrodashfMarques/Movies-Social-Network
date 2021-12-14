<?php

use ReallySimpleJWT\Token;

    require_once("models/user.php");
    require_once("models/base.php");

    $userModel = new User();

    $baseModel = new Base();


    if(in_array($_SERVER["REQUEST_METHOD"], ["POST", "PUT", "DELETE"]) ) {

        $userId = $baseModel->routeRequiresValidation();
        // Validation

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

        if(!empty($id) && empty($postModel->getItemByUser($id, $userId))){
            header("HTTP/1.1 403 Forbidden");
            die('{"message": "You do not have permission to perform this action "}');
        }

    }


    function registerValidator($data){
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

        if(isset($id)){
            
        }

        // Get connected user info so it can load it on the front end
        
    }



    else if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);
    
    }


?>