<?php

    require_once("base.php");

    class Post extends Base {
        public function getAllPosts(){
            $query = $this->dataBase->prepare("
            SELECT *
            FROM posts
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }


        public function getConnectedUserPosts(){}

        public function getPost($id){
            $query = $this->dataBase->prepare("
            SELECT *
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
                SET user_id = ?, content = ?
                WHERE post_id = ?
            ");

            return $query->execute([
                $data["user_id"],
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


        public function likeDislikePost($postId, $userId){

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

                // return $dislikePostQuery->fetch();
                return $this->dataBase->lastInsertId();


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

            return $this->dataBase->lastInsertId();
        }

        public function getPostComments($postId){
            $query = $this->dataBase->prepare("
            SELECT comment_id, comments.content
            FROM comments
            INNER JOIN posts USING(post_id)
            WHERE post_id = ?
            
            ");

            $query->execute([
                $postId
            ]);

            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }



    }

?>