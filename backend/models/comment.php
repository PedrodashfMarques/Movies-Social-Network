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


}

?>