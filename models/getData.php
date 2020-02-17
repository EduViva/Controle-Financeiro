<?php

include "../controllers/dbAccess.php";

$mes = $_GET['mes'];
$ano = $_GET['ano'];

$lanc = "SELECT * FROM `lancamentos` WHERE `mes`=". $mes ." && `ano`=". $ano;
$return = $db->query($lanc);

$renda = "SELECT * FROM `movimentacao` WHERE `mesMov`=". $mes ." && `anoMov`=". $ano;

$return2 = $db->query($renda);

if($return2->num_rows != 0){

    foreach ($return2 as $key => $value) {
        array_push($return, $value[$key]);    
    }
    
    foreach ($return as $key => $value) {
        echo $value['id'] . "," . $value['dia'] . "," . $value['mes'] . "," . $value['ano'] . "," . $value['descricao'] . "," . $value['categoria'] . "," . $value['valor'] . "," . $value['renda'] . "," . $value['essenciais'] . "," . $value['nao_essenciais'] . "," . $value['torrar'] . "," . $value['investimento'] . "," . $value['caixa'] . ".#";
    }

} else {
    
    foreach ($return as $key => $value) {
        echo $value['id'] . "," . $value['dia'] . "," . $value['mes'] . "," . $value['ano'] . "," . $value['descricao'] . "," . $value['categoria'] . "," . $value['valor'] . ",0,0,0,0,0,0" . ".#";
    }

}



?>