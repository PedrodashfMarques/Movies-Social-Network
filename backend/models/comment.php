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

        public function updateComment($id, $data){
            $commentExistsQuery = $this->dataBase->prepare("
            SELECT comment_id
            FROM comments
            WHERE comment_id = ?
            ");

            $commentExistsQuery->execute([$id]);

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
                $id

            ]);

            
        }


    }

?>