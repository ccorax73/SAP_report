<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Credentials: true");
header("Content-Type: application/json; charset=UTF-8");
error_reporting(E_ERROR);
if ($_SERVER['REQUEST_METHOD'] !== 'GET') :
    http_response_code(405);
    echo json_encode([
        'success' => 0,
        'message' => 'Bad Reqeust Detected! Only get method is allowed',
    ]);
    exit;
endif;

set_error_handler(function($errno, $errstr, $errfile, $errline ){
    throw new ErrorException($errstr, $errno, 0, $errfile, $errline);
});

require 'db_connect.php';
include 'logger.php';

$tol = isset($_GET["tol"])?$_GET["tol"]:date('Ym01');
$ig = (isset($_GET["ig"]))?$_GET["ig"]:date('Ymt');


$database = new Operations();
$conn = $database->dbConnection();

// Query
$qry = "SELECT VBRK.ERDAT as 'Datum', KNA1.NAME1 as 'Megrendelo_nev', VBRK.VBELN as 'Szamla',VBRK.FKART as 'Szfajta', VBRK.NETWR as 'OsszNettoErtek', VBRP.NETWR as 'NettoErtek',
VBRK.WAERK as 'Penznem', VBRP.ARKTX as 'Szoveg', VBRP.FKIMG as 'Mennyiseg', VBRP.VRKME as 'ME', T006A.MSEH3 as 'BME'
FROM SCP.SAPSR3.VBRK VBRK
	LEFT JOIN SCP.SAPSR3.KNA1 KNA1 ON (VBRK.KUNAG=KNA1.KUNNR AND KNA1.MANDT='200')
	LEFT JOIN SCP.SAPSR3.VBRP VBRP ON (VBRK.VBELN = VBRP.VBELN)
	LEFT JOIN SCP.SAPSR3.T006A T006A ON (VBRP.VRKME=T006A.MSEHI and T006A.SPRAS='H' and T006A.MANDT='200')
WHERE (VBRK.ERDAT  BETWEEN '$tol' AND '$ig')
	AND (VBRP.FKIMG > 0)
	AND (VBRP.MANDT='200')
	AND (VBRK.MANDT='200')

ORDER BY 'Datum', 'Megrendelo_nev'";

try {
  // Get Result
  $result = odbc_exec($conn,$qry);

  // Get Data From Result
  while ($data[] = odbc_fetch_array($result));
	echo json_encode([
				'success' => 1,
				'data' => $data,
			]);
  odbc_free_result($result);
      // Close Connection
  odbc_close($conn);
  //print_r($data);
	exit();
}
// (Exception | TypeError  $e)
catch (Exception  $e) {
    http_response_code(500);
    echo json_encode([
        'success' => 0,
        'message' => "SQL hiba!"
    ]);
    exit;
}
catch ( Throwable $e){
			echo $e->getMessage();
			exit;
		}


?>
