<?php
/*
    Formato internacional: 2021-10-20 10:20:30
    cálculos de data usam a medida mais baixa: segundos
    Unix Epoch: 1970-01-01 00:00:00
    Unix timestamp:
*/

// echo time() / 365 / 24 / 60 / 60;

// $diff = time() - strtotime("2021-09-30 20:40:00");

// echo $diff / 60 / 60 / 24;

echo "<br>";

echo date("Y-m-d H:i:s") . "<br>";

// echo date("d/m/Y", time() - 86400) . "<br>";

echo date("j M Y H :i", strtotime("2021-10-05 08:10:23"));
echo "<br>";
echo date("jS F Y G:i");
echo "<br>";
setlocale(LC_ALL, "pt_PT", "pt-PT");

echo strftime("%");

echo date("Y-m-d H:i");
echo "<br>";

echo date("d/m/Y", time() - 86400);

//  TPC Meter a data assim --> 1 Oct 2021 21:32

// Dia MÊs Ano Hora:minuto
echo "<br>";

echo date("j M Y H :i", strtotime("2021-10-05 08:10:23"));
echo "<br>";

echo date("j M Y G:i");
setlocale(LC_ALL, "pt_PT", "pt-PT", "pt");
echo "<br>";

echo strftime("%e %b %Y %H:%M");

?>