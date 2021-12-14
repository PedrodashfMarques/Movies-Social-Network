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

        public function registerUser(){
            
        }

        public function getUserFollowers(){}

        public function getFollowingUsers(){}

        public function getSimilarUsers(){}


        public function followUser(){}

        public function unfollowUser(){}


    }
    
    
?>