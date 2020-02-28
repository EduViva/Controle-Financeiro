<?php

include "../controllers/dbAccess.php";

$id = $_GET["id"];

$sql = "DELETE FROM `lancamentos` WHERE `id`=".$id;

$db->query($sql);


?>