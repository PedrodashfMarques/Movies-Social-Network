<?php
     require_once("models/base.php");
     require_once("models/user.php");

     require_once("sanitizers/sanitizer.php");

     $userModel = new User();

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $userId = $baseModel->routeRequiresValidation();

        if(empty($userId)){
            header("HTTP/1.1 401 Unauthorized");
            die('{"message":"Wrong or missing Auth Token"}');
        }
        
        $data = json_decode(file_get_contents("php://input"), true);

        $sanitizedData = sanitizer($data);

        if(!empty($sanitizedData)){

            $result = $userModel->findUsers($sanitizedData["userNameSearch"]);
            http_response_code(202);
            echo json_encode($result);
            
        } else {
            http_response_code(400);
            echo '{"message": "Bad Request"}';
        }
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>