<?php

function postValidation($data){
    if(
        isset($data["user_id"]) &&
        isset($data["content"]) &&
        is_numeric($data["user_id"]) &&
        mb_strlen($data["content"]) >= 4 &&
        mb_strlen($data["content"]) <= 120
    ){
        return true;
    } 
    return false;
}


?>