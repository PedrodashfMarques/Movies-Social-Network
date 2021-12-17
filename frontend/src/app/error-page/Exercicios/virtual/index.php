<?php

echo "Hello";

echo "<br>";

echo $_SERVER["REQUEST_URI"];

$url_parts = explode("/", $_SERVER["REQUEST_URI"]);

echo "<pre>";

print_r($url_parts[4]);


?>