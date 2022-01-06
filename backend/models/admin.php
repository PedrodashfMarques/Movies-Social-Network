<?php

    require_once("base.php");

    class Admin extends Base{

        public function usersCount(){
            $query = $this->dataBase->prepare("
                SELECT COUNT(*) as totalUsers
                FROM users
            ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }


        public function postsCount(){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) as totalPosts
            FROM posts
        ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }


        public function commentsCount(){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) as totalComments
            FROM comments
        ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }


        public function likesCount(){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) as totalLikes
            FROM likes
        ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC); 
        }


        public function adminsCount(){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) as totalAdmins
            FROM users
            WHERE is_admin = 1
        ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC);  
        }


        public function modsCount(){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) as totalMods
            FROM users
            WHERE is_mod = 1
        ");

            $query->execute();
            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }


        public function giveRemoveUserMod($userId){

            // Check if user is mod already
            $query = $this->dataBase->prepare("
            SELECT is_mod
            FROM users
            WHERE user_id = ?
            ");

            $query->execute([
                $userId
            ]);

            $fetch = $query->fetch(PDO:: FETCH_ASSOC);

            if($fetch["is_mod"] === '0'){

                $query = $this->dataBase->prepare("
                UPDATE users
                SET is_mod = 1
                WHERE user_id  = ?
                ");
    
                $query->execute([
                    $userId
                ]);

                return true;

            }

            if($fetch["is_mod"] === '1'){
                $query = $this->dataBase->prepare("
                UPDATE users
                SET is_mod = 0
                WHERE user_id  = ?
                ");
                $query->execute([
                    $userId
                ]);

                return false;
            }

        }

        public function deleteUser($userId){
            $query = $this->dataBase->prepare("
            DELETE FROM users
            WHERE user_id = ? 
            ");

            $query->execute([
                $userId
            ]);

            return $this->dataBase->lastInsertId();
        }

        
    }



?>