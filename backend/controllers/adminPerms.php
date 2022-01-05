<?php

    require("models/admin.php");

    require_once("sanitizers/updateUserSanitizer.php");

    $adminModel = new Admin();


    if(in_array($_SERVER["REQUEST_METHOD"], ["POST", "DELETE"]) ) {

        $adminOrNot = $baseModel->adminValidation();

        if(empty($adminOrNot)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }

        if($adminOrNot !== '1'){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"You do not have the permission to perform this task."}');

        }

    }

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        if(sanitizer($data) &&
            isset($data["user_id"]) &&
            is_numeric($data["user_id"])
        ){
            var_dump($data["user_id"]);

            
            $result = $adminModel->giveRemoveUserMod($data["user_id"]);

            var_dump($result);
            
            if($result){
                http_response_code(202);
                echo '{
                    "moderator": '.($result ? "true" : "false").'
                }';
            }
            
        }
    } 

    else if($_SERVER["REQUEST_METHOD"] === "DELETE"){
        
        if(!empty($id)){

            $result = $adminModel->deleteUser($id);

            if(!empty($result)){
                http_response_code(202);
                echo '{"message": "User was deleted from system."}';
            }

        }

    }


    else {
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';

    }


?>