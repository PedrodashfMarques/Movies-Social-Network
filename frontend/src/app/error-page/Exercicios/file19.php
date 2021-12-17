<?php


    //  Script para editar ficheiros de texto

    $content = file_get_contents("teste_escrita.txt");

    $content .= date("Y-m-d H:i:s") . " Teste de escrita qualquer a esta hora\n";

    file_put_contents("teste_escrita.txt", $content);

    echo "Ficheiro Alterado";

?>