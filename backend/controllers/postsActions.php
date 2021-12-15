<?php

    require("models/post.php");

    $postModel = new Post();


    if($_SERVER["REQUEST_METHOD"] === "POST"){

        $data = json_decode(file_get_contents("php://input"), true);

        // Aqui vou receber o id do post e o id do user que está conectado a dar like no Post
        if(!empty($data) && intval($data["userId"]) && intval($data["postId"])){

            $userId = $data["userId"];

            $postId = $data["postId"];

            $result = $postModel->likeDislikePost($userId, $postId);

        }
      

    }


?>