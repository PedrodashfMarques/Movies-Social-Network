<?php

    header("Content-Type: image/png");

    // phpinfo();

    $image = imagecreate(600, 400);

    imagecolorallocate($image, 0, 0, 255);

    imagepng($image);

?>