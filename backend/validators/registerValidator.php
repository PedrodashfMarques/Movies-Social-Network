<?php

 function registerValidation($data){
    if(
        !empty($data) &&
            !empty($data["firstName"]) &&
            !empty($data["userName"]) &&
            !empty($data["lastName"]) &&
            !empty($data["email"]) &&
            !empty($data["password"]) &&
            !empty($data["confirmPassword"]) &&
            mb_strlen($data["firstName"]) >= 3 &&
            mb_strlen($data["firstName"]) <= 30 &&
            mb_strlen($data["userName"]) >= 3 &&
            mb_strlen($data["userName"]) <= 30 &&
            mb_strlen($data["lastName"]) >= 3 &&
            mb_strlen($data["lastName"]) <= 30 &&
            mb_strlen($data["email"]) >= 5 &&
            mb_strlen($data["email"]) <= 252 &&
            mb_strlen($data["password"]) >= 6 &&
            mb_strlen($data["password"]) <= 1000 &&
            mb_strlen($data["confirmPassword"]) >= 6 &&
            mb_strlen($data["confirmPassword"]) <= 1000 &&
            filter_var($data["email"], FILTER_VALIDATE_EMAIL) &&
            $data["password"] === $data["confirmPassword"]){
        return true;
    } 
    return false;

}

?>