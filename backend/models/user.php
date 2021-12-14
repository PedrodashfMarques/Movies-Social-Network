<?php

    require_once("base.php");

    class User extends Base{
        public function login($data){
            $query = $this->dataBase->prepare("
            SELECT user_id, email, first_name, username, last_name, password
            FROM users
            WHERE email = ?  
            ");

            $query->execute([
                $data["email"],

            ]);

             $user = $query->fetch( PDO::FETCH_ASSOC );

            if(
                !empty($user) && 
                password_verify($data["password"], $user["password"])
                ){
                    return $user;
            }

            return [];

        }

        public function registerUser($data){

            if($data["email"]){

                $queryForEmails = $this->dataBase->prepare("
                    SELECT email
                    FROM users
                    WHERE email = ?
                ");

                $queryForEmails->execute([
                    $data["email"]
                ]);

                $result = $queryForEmails->fetch( PDO:: FETCH_ASSOC );

                if(!empty($result)){
                    return [];
                }

            } 

            if($data["userName"]){

                $queryForUsername = $this->dataBase->prepare("
                    SELECT username
                    FROM users
                    WHERE username = ?
                ");

                $queryForUsername->execute([
                    $data["userName"]
                ]);

                $result = $queryForUsername->fetch( PDO:: FETCH_ASSOC );

                if(!empty($result)){
                    return [];
                }

            } 

            $query = $this->dataBase->prepare("
            INSERT INTO users
            (first_name, username, last_name, email, password)
            VALUES(?, ?, ? , ? , ?)
            ");

            $query->execute([
                $data["firstName"],
                $data["userName"],
                $data["lastName"],
                $data["email"],
                password_hash($data["password"], PASSWORD_DEFAULT)
            ]);

            return $this->dataBase->lastInsertId();
            
        }

        public function getUserFollowers(){}

        public function getFollowingUsers(){}

        public function getSimilarUsers(){}

        // Do I need 2 functions or just a if control
        public function followUser(){}
        public function unfollowUser(){}


        public function getCountries(){
            $query = $this->dataBase->prepare("
            SELECT nicename
            FROM countries
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }


    }
    
    
?>