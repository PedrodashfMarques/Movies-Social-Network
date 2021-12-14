<?php

require_once("models/user.php");


    $userModel = new User();


    if($_SERVER["REQUEST_METHOD"] === "GET"){

        echo json_encode($userModel->getCountries());
        
    }


?>