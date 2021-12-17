<?php

/*

primitivos (int, string, boolean)
estruturas de dados (arrays, objects)

*/

// Como criar um array em PHP
    $animals = ["Zebra", "Cavalo", "Girafa", "Papagaio", "António Costa", "Leão", "Cão", "Gato"];

    echo $animals[0]; 
    echo $animals[1]; 

    // Para ver todos os registos do array -> print_r()
    echo "<pre>";
    print_r($animals);
    echo "</pre>";
    
    echo "<ul>";
    // array.length em PHP é -> count($animals)
    for($i = 0; $i < count($animals); $i++) {
        echo "<li>" .  $animals [ $i ] . "</li>";
        
    }
    echo "</ul>";

?>

