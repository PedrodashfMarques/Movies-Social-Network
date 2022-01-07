<?php

    function imageTransformer($sanitizedData){
        
        $targetDir = "user-profile-images/";

        $allowedFileTypes = [
            "jpg" => "image/jpeg",
            "png" => "image/png"
        ];

        $decodedImage = base64_decode($sanitizedData["user_image"]);

   
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        $detectedFormat = $finfo->buffer($decodedImage);


        // User Profile Image
        if(in_array($detectedFormat, $allowedFileTypes)){

            $filename = date("Ymd") . "_" . bin2hex(random_bytes(4));

            $extension = "." . array_search($detectedFormat, $allowedFileTypes);

            $file_dir = $targetDir . $filename . $extension;

            file_put_contents($file_dir , $decodedImage);

            $sanitizedData["user_image"] = $file_dir;

        }

        return $sanitizedData;

    }
    


?>