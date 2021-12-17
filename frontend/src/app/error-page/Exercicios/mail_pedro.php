<?php
    $to = "pedromarques119@gmail.com";
    $subject = "Bora aí tomar um café maninho";

    $message = "Está na hora, pá bora lá";

    $result = mail($to, $subject, $message);

    if($result){
        echo "Email enviado com sucesso";
        
    } else{
        echo "Algo correu mal";
    }

    //  isto não funciona de momento porque com esta técnica é necessário estar a trabalhar com um server asério.

?>