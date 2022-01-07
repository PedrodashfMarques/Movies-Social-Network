<?php

    function backgroundImageTransformer($sanitizedData){

        $bgTargetDir = "user-background-images/";

        $allowedFileTypes = [
            "jpg" => "image/jpeg",
            "png" => "image/png"
        ];

        $decodedBackgroundImage = base64_decode($sanitizedData["bgUser_image"]);
   
        $finfo = new finfo(FILEINFO_MIME_TYPE);

        $backgroundDetectedFormat = $finfo->buffer($decodedBackgroundImage);

        // Background Profile Image
        if(in_array($backgroundDetectedFormat, $allowedFileTypes)){

            $bgFileName = date("Ymd") . "_" . bin2hex(random_bytes(5));

            $bgExtension = "." . array_search($backgroundDetectedFormat, $allowedFileTypes);

            $bg_file_dir = $bgTargetDir . $bgFileName . $bgExtension; 

            file_put_contents($bg_file_dir, $decodedBackgroundImage); 

            $sanitizedData["bgUser_image"] = $bg_file_dir;

        }

        return $sanitizedData;

    }
    


?>