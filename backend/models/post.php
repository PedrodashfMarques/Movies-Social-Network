<?php

    require_once("base.php");

    class Post extends Base {
        public function getAllPosts(){
            $query = $this->dataBase->prepare("
            SELECT *
            FROM posts AS p1
            ");

            $query->execute();

            return $query->fetchAll( PDO:: FETCH_ASSOC );
        }






    }

?>