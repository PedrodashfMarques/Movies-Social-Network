<?php

    require_once("./models/user.php");
    require_once("./models/base.php");

    $userModel = new User();

 function updateUserValidator($sanitizedData){

    if(!empty($sanitizedData)){

        $size = strlen($sanitizedData["user_image"]);

        if(
            isset($sanitizedData["small_bio"]) &&
            isset($sanitizedData["big_bio"]) &&
            isset($sanitizedData["location"]) &&
            mb_strlen($sanitizedData["small_bio"]) > 3 &&
            mb_strlen($sanitizedData["small_bio"]) <= 25 &&
            mb_strlen($sanitizedData["big_bio"]) >= 3 &&
            mb_strlen($sanitizedData["big_bio"]) <= 1000 &&
            mb_strlen($sanitizedData["location"]) >= 3 &&
            mb_strlen($sanitizedData["location"]) <= 60 &&
            $size >= 0 &&
            $size < 10000000
            ){
                
            return true;
        } 

        return false;

    }

}

?>