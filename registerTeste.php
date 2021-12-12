<?php

$dataBase = new PDO("mysql:host=localhost;dbname=backendproject;charset=utf8mb4", "root", "");

$password = "topasmeus123";

$nomeUser = "Pedro";

$query = $dataBase->prepare("
    UPDATE users
    SET password = ?
    WHERE first_name = ?
");

$query->execute([
    password_hash($password, PASSWORD_DEFAULT),
    $nomeUser
]);

?>