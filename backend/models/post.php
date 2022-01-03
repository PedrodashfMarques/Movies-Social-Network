<?php

    require_once("base.php");

    class Post extends Base {
        public function getAllPosts(){
            $query = $this->dataBase->prepare("
            SELECT posts.user_id, 
            posts.post_id, 
            posts.content, 
            posts.created_at,
            users.first_name,
            users.username,
            users.last_name,
            users.user_image,
            users.is_verified,
            (SELECT COUNT(*)
            FROM likes 
            WHERE likes.post_id = posts.post_id) AS likesNumber,
            (SELECT COUNT(*)
            FROM comments
            WHERE comments.post_id = posts.post_id
           ) AS commentsNumber
            FROM posts
            INNER JOIN users USING(user_id)
            ORDER BY posts.created_at DESC
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }

        
        public function getUserLikedPosts($connectedUserId, $oldPosts){

            $likedPostsArray = array();

            foreach ($oldPosts as $eachPost) {

                $query = $this->dataBase->prepare("
                SELECT likes.post_id
                FROM likes
                WHERE likes.post_id = ?
                AND likes.user_id = ?
                ");

                $query->execute([
                    $eachPost["post_id"],
                    $connectedUserId
                ]);

                $fetch = $query->fetchAll(PDO :: FETCH_ASSOC );

                if($fetch){
                    array_push($likedPostsArray, $eachPost);
                    
                } 
            }

            return $likedPostsArray;

        }

        public function getUserCommentedPosts($connectedUserId, $oldPosts){
            $commentedPostsArray = array();

            foreach ($oldPosts as $eachPost) {
                $query = $this->dataBase->prepare("
                SELECT comments.comment_id
                FROM comments
                WHERE comments.post_id = ?
                AND comments.user_id = ?
                ");

                $query->execute([
                    $eachPost["post_id"],
                    $connectedUserId
                ]);
                
                $fetch = $query->fetchAll( PDO :: FETCH_ASSOC );

                if($fetch){
                    array_push($commentedPostsArray, $eachPost);
                }

            }

            return $commentedPostsArray;

        }


        public function getPost($id){
            $query = $this->dataBase->prepare("
            SELECT *,
            (SELECT COUNT(*)
            FROM likes 
            WHERE likes.post_id = posts.post_id) AS likesNumber,
            (SELECT COUNT(*)
            FROM comments
            WHERE comments.post_id = posts.post_id
           ) AS commentsNumber
            FROM posts
            WHERE posts.post_id = ?
            ");

            $query->execute(
                [$id],
            );

            return $query->fetch(PDO:: FETCH_ASSOC );

            
        }

        public function createPost($data){
            $query = $this->dataBase->prepare("
            INSERT INTO posts
            (user_id, content)
            VALUES(?, ?)
            ");

            $query->execute([
                $data["user_id"],
                $data["content"],
            ]);

            return $this->dataBase->lastInsertId();
        }

        public function updatePost($id, $data){
            $query = $this->dataBase->prepare("
                UPDATE posts
                SET content = ?
                WHERE post_id = ?
            ");

            return $query->execute([
                $data["content"],
                $id
            ]);

        }

        
        public function deletePost($id){
            $query = $this->dataBase->prepare("
            DELETE FROM posts
            WHERE post_id = ?
            ");

            return $query->execute([
                $id
            ]);
        }


        public function getItemByUser($id, $userId){
            $query = $this->dataBase->prepare("
            SELECT post_id
            FROM posts
            WHERE post_id = ?
            AND user_id = ?
            ");

            $query->execute([
                $id,
                $userId
            ]);

            return $query->fetch( PDO::FETCH_ASSOC );
        }


        public function togglePostLike($postId, $userId){
            
            $postAlreadyLikedQuery = $this->dataBase->prepare("
            SELECT post_id, user_id
            FROM likes
            WHERE post_id = ?
            AND user_id = ?
            ");

            $postAlreadyLikedQuery->execute([
                $postId,
                $userId
            ]);

            $result = $postAlreadyLikedQuery->fetch(PDO:: FETCH_ASSOC);


            if(!empty($result)){
                $dislikePostQuery = $this->dataBase->prepare("
                    DELETE FROM likes
                    WHERE post_id = ?
                    AND user_id = ?
                ");

                $dislikePostQuery->execute([
                    $postId,
                    $userId
                ]);

                return false;

            }

        
            $query = $this->dataBase->prepare("
                INSERT INTO likes
                (post_id, user_id)
                VALUES(?, ?)
                ");

            $query->execute([
                $postId,
                $userId
            ]);

            return true;
        }


        public function countPostLikes($postId){
            $query = $this->dataBase->prepare("
            SELECT COUNT(*) AS Total
            FROM likes
            INNER JOIN posts USING(post_id)
            WHERE post_id = ?       
            ");

            $query->execute([
                $postId
            ]);

            return $query->fetchAll(PDO:: FETCH_ASSOC);

        }

        public function findPosts($data){
            $query = $this->dataBase->prepare("
            SELECT
                users.user_id,
                users.first_name,
                users.username,
                users.last_name,
                users.user_image,
                users.is_verified,
                posts.post_id,
                posts.content,
                posts.created_at,
                (SELECT COUNT(*)
                FROM likes
                WHERE likes.post_id = posts.post_id ) AS likesNumber,
                (SELECT COUNT(*)
                FROM comments
                WHERE comments.post_id = posts.post_id) AS commentsNumber
            FROM 
                posts
            INNER JOIN users USING(user_id)
            WHERE 
                CONCAT(content)
            LIKE ?
            ORDER BY posts.created_at DESC
            ");
            
            $query->execute([
                "%".$data."%"
            ]);

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }



    }

?>