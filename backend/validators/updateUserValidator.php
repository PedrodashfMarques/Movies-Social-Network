<?php

    require_once("models/user.php");
    require_once("models/base.php");

    $userModel = new User();

 function updateUserValidator($data){

    // $allCountries = $userModel->getCountries();


    if(
        !empty($data["small_bio"]) &&
        !empty($data["big_bio"]) &&
        !empty($data["location"]) &&
        mb_strlen($data["small_bio"]) > 3 &&
        mb_strlen($data["small_bio"]) <= 25 &&
        mb_strlen($data["big_bio"]) >= 3 &&
        mb_strlen($data["big_bio"]) <= 1000 &&
        mb_strlen($data["location"]) >= 3 &&
        mb_strlen($data["location"]) <= 60 &&
        mb_strlen($data["userImage"]) <= 5000 &&
        mb_strlen($data["bgUserImage"]) <= 5000
        ){
        return true;
    } 
    return false;

}

?>