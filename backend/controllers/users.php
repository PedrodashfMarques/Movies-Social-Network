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




?>