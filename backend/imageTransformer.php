<?php

    function imageTransformer($sanitizedData){
        
        $targetDir = "user-profile-images/";

        $allowedFileTypes = [
            "jpg" => "image/jpeg",
            "png" => "image/png"
        ];


        $decodedImage = base64_decode($sanitizedData["userImage"]);

        $finfo = new finfo(FILEINFO_MIME_TYPE);

        $detectedFormat = $finfo->buffer($decodedImage);

        if(in_array($detectedFormat, $allowedFileTypes)){

            $filename = date("Ymd") . "_" . bin2hex(random_bytes(4));

            $extension = "." . array_search($detectedFormat, $allowedFileTypes);

            $file_dir = $targetDir . $filename . $extension;

            // var_dump($file_dir);

            file_put_contents($file_dir , $decodedImage);

            $sanitizedData["userImage"] = $file_dir;

        }

        return $sanitizedData;

    }
    


?>