<?php

    require_once("base.php");

    class User extends Base{
        public function login($data){
            $query = $this->dataBase->prepare("
            SELECT 
            user_id, 
            email, 
            first_name, 
            username, 
            last_name, 
            password, 
            location, 
            small_bio, 
            big_bio, 
            user_image, 
            background_image,
            is_admin,
            is_verified
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


        public function getUserData($id){
            $query = $this->dataBase->prepare("
            SELECT
            first_name,
            username,
            last_name,
            location,
            small_bio,
            big_bio,
            user_image,
            background_image,
            is_verified,
            is_admin,
            category,
            created_at
            FROM users
            WHERE user_id = ?     
            ");

            $query->execute([$id]);

            return $query->fetch(PDO:: FETCH_ASSOC );
        }


        public function updateUserData($id, $data){
            $query = $this->dataBase->prepare("
            UPDATE users
            SET small_bio = ?, big_bio = ?, location = ?, category = ?
            WHERE user_id  = ?
            ");
            
            return $query->execute([
                $data["small_bio"],
                $data["big_bio"],
                $data["location"],
                $data["category"],
                $id
            ]);

        }


        public function updateUserImage($userId, $image){
            $query = $this->dataBase->prepare("
            UPDATE users
            SET user_image = ?
            WHERE user_id  = ?    
            ");

            return $query->execute([
                $image,
                $userId
            ]);

        }


        public function getConnectedUserFollowers($id){
            $query = $this->dataBase->prepare("
            SELECT 
            user_following,
            users.first_name,
            users.username,
            users.last_name,
            users.user_image,
            users.is_verified
            FROM follows
            INNER JOIN users ON(users.user_id = follows.user_following)
            WHERE user_followed = ?
            ORDER BY follow_id
            ");

            $query->execute([
                $id
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }

        public function getConnectedUserFollowing($id){
            $query = $this->dataBase->prepare("
            SELECT 
            user_followed,
            users.first_name,
            users.username,
            users.last_name,
            users.user_image,
            users.is_verified
            FROM follows
            INNER JOIN users ON(users.user_id = follows.user_followed)
            WHERE user_following = ?
            ORDER BY follow_id
            ");

            $query->execute([
                $id
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }



        public function followUnfollow($id, $connectedUserId){

            // Check if user is already following

            $alreadyFollowingQuery = $this->dataBase->prepare("
            SELECT user_following, user_followed
            FROM follows
            WHERE user_following = ?
            AND user_followed = ?
            ");

            $alreadyFollowingQuery->execute([
                $connectedUserId["userId"],
                $id
            ]);

            $result = $alreadyFollowingQuery->fetch(PDO:: FETCH_ASSOC);


            if(!empty($result)){
                $deleteFollowQuery = $this->dataBase->prepare("
                DELETE FROM follows
                WHERE user_following = ?
                AND user_followed = ?
                ");

                $deleteFollowQuery->execute([
                    $connectedUserId["userId"],
                    $id
                ]);

                return $this->dataBase->lastInsertId();

            }

            $query = $this->dataBase->prepare("
            INSERT INTO follows
            (user_following, user_followed)
            VALUES(? , ?)
            ");

            $query->execute([
                $connectedUserId["userId"],
                $id
            ]);

            return $this->dataBase->lastInsertId();
        }

        public function getCountries(){
            $query = $this->dataBase->prepare("
            SELECT nicename
            FROM countries
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }

        public function getCategories(){
            $query = $this->dataBase->prepare("
            SELECT name
            FROM user_categories
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }

        public function followersCount($userId){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) AS Total
            FROM follows
            INNER JOIN users ON(users.user_id = follows.user_following)
            WHERE user_followed = ?
            ");
            $query->execute([$userId]);

            return $query->fetch(PDO:: FETCH_ASSOC);

        }

        public function followingCount($userId){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) AS Total
            FROM follows
            INNER JOIN users ON(users.user_id = follows.user_followed)
            WHERE user_following = ?
            ");
            $query->execute([$userId]);

            return $query->fetch(PDO:: FETCH_ASSOC);
        }

        public function getUserPosts($userId){
            $query = $this->dataBase->prepare("  
                SELECT users.first_name,
                users.username,
                users.last_name,
                users.user_image,
                posts.post_id,
                posts.created_at,
                posts.content,
                (SELECT COUNT(*)
                FROM likes
                WHERE likes.post_id = posts.post_id
                ) AS likesNumber
                FROM posts
                INNER JOIN users USING(user_id)
                WHERE users.user_id = ?
                ORDER BY posts.created_at DESC
            ");

            $query->execute([
                $userId
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );

        }

        public function checkIfUserAlreadyFollowing($id, $connectedUserId){

            $query = $this->dataBase->prepare("
            SELECT follows.user_following, follows.user_followed
            FROM follows
            WHERE user_following = ?
            AND user_followed = ?
            ");

            $query->execute([
                $connectedUserId,
                $id
            ]);

            return $query->fetch(PDO::FETCH_ASSOC);

        }

        public function getAllUsers(){
            $query = $this->dataBase->prepare("
                SELECT
                    user_id,
                    first_name,
                    username,
                    last_name,
                    user_image,
                    is_verified
                FROM users
                ORDER BY first_name ASC
            ");

            $query->execute();

            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }

        public function findUsers($data){
            $query = $this->dataBase->prepare("
                SELECT
                    user_id,
                    first_name,
                    username,
                    last_name,
                    user_image,
                    is_verified
                FROM 
                    users
                WHERE 
                    CONCAT(first_name, username, last_name)
                LIKE ?
            ");
            
            $query->execute([
                "%".$data."%"
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }


        public function getSimilarUsersToThis($userCategory, $userId){
            // Perguntar ao Ivo como fazer este
            $query = $this->dataBase->prepare("
                SELECT
                    user_id,
                    first_name,
                    username,
                    last_name,
                    user_image,
                    is_verified
                FROM 
                    users
                WHERE category = ?
                AND user_id<>'$userId'
            ");

            $query->execute([
                $userCategory
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );

        }

    }
    
?>