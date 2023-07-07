<?php

ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);

foreach ($_SERVER as $parm => $value)  echo "$parm = '$value'". "<br>";

if (isset($_GET["clear"]))
	{
    $file = 'logs.txt';
    file_put_contents($file, "");
  }

?>
