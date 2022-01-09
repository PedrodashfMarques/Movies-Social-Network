<?php

    function sanitizer($data){

        if(!empty($data)){
            foreach ($data as $key => $value) {
                $data[$key] = trim(htmlspecialchars(strip_tags($value)));
            }

            return $data; 
        }

        return false;

    }


?>