<?php
print_r($_POST);

/* 
quando escolher:

* GET (SELECT); uma pesquisa por exemplo.

* POST (INSERT, UPDATE, DELETE); formulário de registo / criação de conta

*/

$insults = ["idiota", "imbecil", "estrupicio", "estupido", "nabo", "palhaço", "parvo", "energumo"];
$adjectives = ["muito", "super", "ultra", "mega", "muitissimo", "grande", "um pouco", "enorme"];

$adjective = $adjectives[mt_rand(0, count($adjectives) -1) ] ;

$insult = $insults[mt_rand(0, count($insults) -1) ] ;

?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>

<?php
    if(isset($_GET["full_name"]) ){
?>
    <p> <?php echo $_GET["full_name"]; ?> é <?php echo $adjective . " " . $insult ?> </p>
<?php
    }
?>

<form method="get" action="file8Formulario.php">
    <div>
        <label> Nome completo
            <input type="text" name="full_name">
        </label>
    </div>

    <div>
        <button type="submit" name="send"> Enviar </button>
    </div>

</form>
    
</body>
</html>