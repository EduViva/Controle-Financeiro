<?php

include "../controllers/dbAccess.php";

$mes = $_GET["mes"];
$ano = $_GET["ano"];
$cat = $_GET["cat"];
$valor = $_GET["valor"];

if($cat == 'gastos essenciais'){
    $cat = 'essenciais';
} else if($cat == 'gastos não essenciais'){
    $cat = 'nao_essenciais';
}

$busca = "SELECT * FROM `movimentacao` WHERE `mesMov`=". $mes ." && `anoMov`=". $ano;
$retBusca = $db->query($busca);

if($retBusca->num_rows != 0){

    foreach ($retBusca as $key => $value) {
        $newV = $value[$cat] + $valor;
    }

    $sql = "UPDATE `movimentacao` SET `".$cat."`=".$newV." WHERE `mesMov`=".$mes." && `anoMov`=".$ano;
} else {
    $sql = "INSERT INTO `movimentacao` (mesMov, anoMov, " . $cat . ") VALUES 
    ('" . $mes . "','" . $ano . "','" . $valor . "')";
}

$db->query($sql);


?>