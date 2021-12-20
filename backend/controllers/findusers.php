<?php

     require_once("models/user.php");
     require_once("models/base.php");

    if($_SERVER["REQUEST_METHOD"] === "GET"){

        $data = json_decode(file_get_contents("php://input"), true);

        // $result

    }


?>