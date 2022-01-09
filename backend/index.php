<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

header("Content-Type: application/json");

require_once("models/base.php");

$baseModel = new Base();

require("vendor/autoload.php");

define("CONFIG", parse_ini_file(".env"));

define("ROOT", 
    rtrim(
        str_replace(
        "\\", 
        "/", dirname($_SERVER["SCRIPT_NAME"])
        ),
        "/"
    )
);


$controllers = [
    "login",
    "register",
    "users",
    "posts",
    "postsActions",
    "comments",
    "countries",
    "checkFollowUnfollow",
    "findUsers",
    "findPosts",
    "findComments",
    "userCategories",
    "adminPerms"
];

    $url_parts = explode("/", $_SERVER["REQUEST_URI"]);

    $controller = $url_parts[2];

    if(!empty($url_parts[3]) && is_numeric($url_parts[3])){
        $id = intval($url_parts[3]);
    }

    if(!in_array($controller, $controllers)){
        header("HTTP/1.1 400 Bad Request");
        die('{"message ": "Rota Inválida"}');
    }

    require("controllers/" . $controller . ".php");


?>