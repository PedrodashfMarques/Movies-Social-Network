<?php

// Array Multidimensional

$poets = [
        [
            "name" => "Fernando Pessoa",
            "birth_date" => "1888-06-13", //Conceito de array associativo
            "famous_work" => "A Mensagem" 
        ],
        [
            "name" => "Cesário Verde",
            "birth_date" => "1855-02-25",
            "famous_work" => "Livro de Cesário Verde"
        ],
        [
            "name" => "Luís de Camões",
            "birth_date" => "1524",
            "famous_work" => "Lusiadas"
        ]
    ];

    echo "<pre>";
    print_r($poets);
    echo "</pre>";

    echo $poets[2]["name"];
    echo "<br>";
    echo $poets[2]["famous_work"];

    echo "
    <style>
    table,tr,th,td {
         border: 1px solid #000; border-collapse: collapse; 
         font-size: 1.5em;
         background-color: dodgerblue;
        }
    </style>
        <table>
            <tr>
                <th> Nome </th>
                <th> Data Nascimento </th>
                <th> Obra Famosa </th>
            </tr>
        </table>
    ";

    // Usar um ciclo para gerar três linhas de tabela por cada poeta
    // Preencher a informação relevante dentro dos TDs

    for ($index = 0; $index < count($poets) ; $index++) { 
        // echo $poets [$index]["name"] ;

        echo "
            <tr>
            <br>

            <td>" .$poets[$index]["name"]. "</td>
    
            <br>

            <td>" .$poets[$index]["birth_date"]. "</td>

            <br>

            <td>" .$poets[$index]["famous_work"]. "</td>
        </tr>
    
    ";

    echo "
        <tr>
            <td> </td>
            <td> </td>
            <td> </td>
        </tr>
    ";
    }

    

?>