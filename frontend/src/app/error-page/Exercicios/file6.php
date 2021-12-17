<?php
/*
    Como efectuar conexões a BDs em PHP:
    * PDO
        ou
    * mysqli
*/

/*
3 parametros a preencher no PDO:

1( string de conexão e configuração da driver)
2) username (no xampp é sempre -> root)
3) password

*/

$db = new PDO("mysql:host=localhost;dbname=classicmodels;charset=utf8mb4", "root", "");


// var_dump($db);


// Como fazer uma query SQL para ir buscar informação à base de dados;

/* Executar uma query tem 2 a 3 partes dependendo se é um SELECT ou qualquer outro comando */

// 1) primeiro, preparamos a query

$query = $db->prepare("
    SELECT productCode, productName, productLine, MSRP
    FROM products
");

// 2) segundo, executamos a query

$query->execute();

// 3) terceiro, CASO seja um select é necessário obter os dados para dentro de uma variável;

$products = $query->fetchAll( PDO::FETCH_ASSOC ); // Usamos PDO::FETCH_ASSOC para não repetirmos a informação

?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title> Lista de Produtos</title>
    <style>
        table,tr, th, td{
            border: 1px solid #000;
            border-collapse: collapse;
        }
    </style>
</head>
<body>
    <table>
        <tr>
            <th> Código </th>
            <th> Nome </th>
            <th> Categoria </th>
            <th> Preço </th>
        </tr>

        <?php
            foreach($products as $cadaProduto) { // Em vez de fazer o for Loop tradicional podemos fazer um forEach
                // $cadaProduto = $products[$index];

               echo '
                <tr>
                    <td>' . $cadaProduto["productCode"]. '</td>
                    <td>' . $cadaProduto["productName"]. '</td>
                    <td>' . $cadaProduto["productLine"]. '</td>
                    <td>' . $cadaProduto["MSRP"]. '</td>
                </tr> 
               '  ;
            }
        ?>

    </table>
    
</body>
</html>