<?php

    $baseDados = new PDO("mysql:host=127.0.0.1;dbname=classicmodels;charset=utf8mb4", "root", "");

    $query = $baseDados->prepare("
        SELECT
            customers.customerName,
            orders.orderDate,
            ROUND(SUM(od.quantityOrdered * od.priceEach), 2) AS total
        FROM orders
        INNER JOIN orderdetails AS od USING(orderNumber)
        INNER JOIN products USING(productCode)
        INNER JOIN customers USING(customerNumber)
        WHERE products.productLine = 'Motorcycles'
        GROUP BY
            customers.customerName,
            orders.orderDate
        ORDER BY
        orderDate, customerName
    ");

    $query->execute();

    $listaProdutos = $query->fetchAll( PDO:: FETCH_ASSOC);

    // echo "<pre>";
    // print_r($listaProdutos);

?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=
    , initial-scale=1.0">
    <title> Exercicio listar produtos </title>
</head>
<body>
    <table border="4px solid grey">
        <tr>
            <th>Data de Encomenda</th>
            <th>Nome de Cliente</th>
            <th>Custo Total</th>
        </tr>

        <?php
        
        foreach($listaProdutos as $cadaProduto){
            echo '
            <tr>
                <td> $' .$cadaProduto["orderDate"]. '</td>
                <td> $' .$cadaProduto["customerName"]. '</td>
                <td> $' .$cadaProduto["total"]. '</td>
            </tr>
            ';
        };
        
        ?>
    
    </table>

</body>
</html>