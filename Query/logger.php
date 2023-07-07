<?php

$file = 'logs.txt';
$currentDate = date('Y-m-d H:i:s');
$logdata = $currentDate."\t REMOTE_ADDR ". $_SERVER["REMOTE_ADDR"]."\t REQUEST_URI ". str_replace(array('/riportok_fem/','.php'),'',$_SERVER["REQUEST_URI"]);

if (isset($_SERVER["REMOTE_USER"]))
	{$logdata .= "\t REMOTE_USER ". $_SERVER["REMOTE_USER"];}
file_put_contents($file, $logdata. "\r\n", FILE_APPEND | LOCK_EX);
if (filesize($file) > 5*1024*1024){
	$currentDate = date('Y-m-d__H_i_s');
	rename($file,"log_".$currentDate.".txt");
	file_put_contents($file, "Old log file was archived to: "."log_".$currentDate.".txt\r\n", FILE_APPEND | LOCK_EX);
}

?>
