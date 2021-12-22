<?php

use ReallySimpleJWT\Token;

    class Base{

        protected $dataBase;

        public function __construct(){
            $this->dataBase = new PDO("mysql:host=localhost;dbname=backendproject;charset=utf8mb4", "root", "");

        }

        public function routeRequiresValidation($tokenKey){
            // $headers = apache_request_headers();

            // foreach($headers as $header => $value){
            //     if(strtolower($header) === "x-auth-token"){
            //         $tokenKey = trim($value);
            //     }; 
            // };

            $secret = CONFIG["SECRET_KEY"];

            $tokenIsValid = Token::validate($tokenKey, $secret);

            if($tokenIsValid){
                $user = Token::getPayload($tokenKey, $secret);
            }

            if(isset($user)){
                return $user["userId"];
            }

            return 0;

        }

    }

?>