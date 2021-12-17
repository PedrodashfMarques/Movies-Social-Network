<?php

session_start();

if (isset($_POST["send"])) {

    if($_POST["captcha"] === $_SESSION["captcha"]){
        $message = "Parabéns, és humano bro";
    } else{
        $message = "És um robot bro?";
    }
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Exercicio de CAPTCHA</title>
</head>
<body>
    <main>
        <h1> Transcreva o texto se for humano </h1>
<?php
    if(isset($message)){
        echo '<p role="alert">' .$message. '</p>';
    }
?>
        <div>
            <img src="captcha.php" alt="">
        </div>
        <form method="post" action="file16.php">
            <div> 
                <label>
                    Texto da imagem
                    <input type="text" name="captcha" required>
                </label>
                <button type="submit" name="send"> Enviar </button>
            </div>
        </form>
    </main>
    
</body>
</html>