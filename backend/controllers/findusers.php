<?php
     require_once("models/base.php");
     require_once("models/user.php");

     require_once("sanitizers/sanitizer.php");

     $userModel = new User();

    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        // Fazer validações $data["userId"] e $data["userNameSearch"]

        $sanitizedData = sanitizer($data);

        if(!empty($sanitizedData)){
            
            // var_dump($sanitizedData["userNameSearch"]);
            $result = $userModel->findUsers($sanitizedData["userNameSearch"]);

            http_response_code(202);
            echo json_encode($result);
        }  
    }

    else{
        http_response_code(405);
        echo '{"message": "Method Not Allowed"}';
    }


?>