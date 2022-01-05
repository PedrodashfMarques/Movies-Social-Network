<?php 

require_once("base.php");

    class Comment extends Base {

        public function getAllComments(){
            $query = $this->dataBase->prepare("
                SELECT 
                users.first_name,
                users.username,
                users.last_name,
                users.user_image,
                users.is_verified,
                comment_id,
                comments.post_id,
                comments.user_id,
                comments.content,
                comments.created_at            
                FROM comments
                INNER JOIN users USING(user_id)
            ");
        
            $query->execute();
            
            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }

        public function getPostComments($postId){
            $query = $this->dataBase->prepare("
            SELECT 
            users.user_id,
            users.first_name,
            users.username,
            users.last_name,
            users.user_image,
            users.is_verified,
            comments.comment_id, 
            comments.content, 
            comments.created_at      
            FROM comments
            INNER JOIN users USING(user_id)
            INNER JOIN posts USING(post_id)
            WHERE posts.post_id = ?
            ORDER BY created_at DESC
            ");

            $query->execute([
                $postId
            ]);

            return $query->fetchAll(PDO:: FETCH_ASSOC);
        }

        public function commentPost($data){
            $query = $this->dataBase->prepare("
            INSERT INTO comments
            (post_id, user_id, content)
            VALUES(?, ?, ?)
            ");
        
            $query->execute([
                $data["postId"],
                $data["userId"],
                $data["content"]
            ]);
            
            return $this->dataBase->lastInsertId();
        
        }

        public function updateComment($commentId, $data){
            $commentExistsQuery = $this->dataBase->prepare("
            SELECT comment_id
            FROM comments
            WHERE comment_id = ?
            ");
            $commentExistsQuery->execute([$commentId]);

            $result = $commentExistsQuery->fetch(PDO:: FETCH_ASSOC );

            if(empty($result)){
                return [];
            }

            $query = $this->dataBase->prepare("
                UPDATE comments
                SET content = ?
                WHERE comment_id = ?
            
            ");

            return $query->execute([
                $data["content"],
                $commentId,

            ]);

            
        }

        public function deleteComment($idComment){
            $checkCommentExistence = $this->dataBase->prepare("
            SELECT comment_id
            FROM comments
            WHERE comment_id = ?
            ");

            $checkCommentExistence->execute([
                $idComment
            ]);

            $result = $checkCommentExistence->fetch();

            if(empty($result)){
                return [];
            }


            $deleteQuery = $this->dataBase->prepare("
            DELETE FROM comments
            WHERE comment_id = ?
            ");

            return $deleteQuery->execute([
                $idComment
            ]);

        }


    }

?>