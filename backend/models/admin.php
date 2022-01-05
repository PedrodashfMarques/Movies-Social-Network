<?php

    require_once("base.php");

    class Admin extends Base{

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