<?php

    include "../controllers/dbAccess.php";

    $mes = $_GET['mes'];
    $ano = $_GET['ano'];

    $renda = "SELECT * FROM `movimentacao` WHERE `mesMov`=". $mes ." && `anoMov`=". $ano;
    $return2 = $db->query($renda);

if($return2){
    foreach ($return2 as $key => $value) {
        echo $value['idMov'] . "," . $value['renda'] . "," . $value['essenciais'] . "," . $value['nao_essenciais'] . "," . $value['torrar'] . "," . $value['investimento'] . "," . $value['caixa'];
    }
} else {
    echo "0,0,0,0,0,0,0";
}

    

?>