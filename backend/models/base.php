<?php
    class Base{

        protected $dataBase;

        public function __construct(){
            $this->dataBase = new PDO("mysql:host=localhost;dbname=backendproject;charset=utf8mb4", "root", "");


        }

        // Aqui depois vou ter uma rota para a validação do usuário com o seu JWT


    }

?>