<?php

include "../controllers/dbAccess.php";

$dia = $_GET["dia"];
$mes = $_GET["mes"];
$ano = $_GET["ano"];
$desc = $_GET["desc"];
$cat = $_GET["cat"];
$valor = $_GET["valor"];

$sql = "INSERT INTO `lancamentos` (dia, mes, ano, descricao, categoria, valor) VALUES
('". $dia ."','" . $mes . "','" . $ano . "','" . $desc . "','" . $cat . "','" . $valor . "')";

$db->query($sql);

echo mysqli_insert_id($db);

?>