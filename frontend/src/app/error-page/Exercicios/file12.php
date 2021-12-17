<?php

    header("Content-Type: image/png");

    $image = imagecreate(700, 500);

    imagecolorallocate($image, 200, 200, 200);

    $font = __DIR__ . "/DelightCandles.ttf";   //Caminho absoluto do diretório

    $black = imagecolorallocate($image, 0, 0, 0);

    imagettftext($image, 30, 0, 100, 100, $black, $font, "o texto");

    imagepng($image);

    /*
        TTF True Type Format
        OTF Open Type Format
        WOFF Web Open Font Format
    
    */
?>