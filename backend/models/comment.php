<?php 

require_once("base.php");

    class Comment extends Base {

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