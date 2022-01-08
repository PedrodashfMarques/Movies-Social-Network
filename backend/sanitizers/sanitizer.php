<?php

    function sanitizer($data){

        if(!empty($data)){
            foreach ($data as $key => $value) {
                $data[$key] = trim(htmlspecialchars(strip_tags($value)));
            }
            // var_dump($data);

            return $data; 
        }

        return false;

    }


?>