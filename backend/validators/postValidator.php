<?php

function postValidation($data){
    if(
        isset($data["content"]) &&
        mb_strlen($data["content"]) >= 4 &&
        mb_strlen($data["content"]) <= 120
    ){
        return true;
    } 
    return false;
}


?>