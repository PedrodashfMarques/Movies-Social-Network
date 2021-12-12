<?php

    require("models/post.php");
  
    $postModel = new Post();

    if($_SERVER["REQUEST_METHOD"] === "GET"){
        echo json_encode($postModel->getAllPosts());
    }


?>