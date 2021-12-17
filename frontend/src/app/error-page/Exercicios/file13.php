<?php

// header("Content-Type: image/jpeg");

    $image = imagecreatefromjpeg("bannerBootcamp.jpg");
    imagefilter($image, IMG_FILTER_GRAYSCALE);

    $font = __DIR__ . "/DelightCandles.ttf";   //Caminho absoluto do diretório

    $red = imagecolorallocate($image, 255, 0, 0);

    imagettftext($image, 150, 0, 270, 1300, $red, $font, "Bootcamp do maninho");


    imagejpeg($image, "imagem_alterada.jpg", 85); //85 de 85% para gravar com 85% da qualidade

    echo "Imagem gravada com sucesso";

    // Taxa de compressão

    // echo '<pre>';
    // print_r($image);
    // echo '<pre>';

?>