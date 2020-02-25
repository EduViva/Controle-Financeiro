<?php

    include "../controllers/dbAccess.php";

    $mes = $_GET['mes'];
    $ano = $_GET['ano'];

    $lanc = "SELECT * FROM `lancamentos` WHERE `mes`=". $mes ." && `ano`=". $ano;
    $return = $db->query($lanc);

    foreach ($return as $key => $value) {
        echo $value['id'] . "," . $value['dia'] . "," . $value['mes'] . "," . $value['ano'] . "," . $value['descricao'] . "," . $value['categoria'] . "," . $value['valor'] . ",0,0,0,0,0,0" . ".#";
    }

?>