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
$qry = "SELECT TOP 1500 MKPF.MBLNR as 'Anyagbiz',MKPF.BUDAT  as 'Konyveles_ideje',MSEG.MATNR as 'Anyagszam', T134T.MTBEZ as 'Acsoport', MAKT.MAKTX as 'Megnev',MSEG.ERFMG as 'Menny',T006A.MSEH3 as 'ME', MSEG.EBELN as 'Rendeles', MSEG.LIFNR as 'Szallitokod',
LFA1.NAME1 as 'Szallitonev', MSEG.DMBTR as 'Ertek', MSEG.WAERS as 'Penznem'
FROM SCP.SAPSR3.MKPF MKPF  LEFT JOIN SCP.SAPSR3.MSEG MSEG ON (MKPF.MBLNR=MSEG.MBLNR and MSEG.MANDT='200')
LEFT JOIN SCP.SAPSR3.MAKT MAKT  ON (MSEG.MATNR=MAKT.MATNR and MAKT.SPRAS='H' and MAKT.MANDT='200')
LEFT JOIN SCP.SAPSR3.LFA1 LFA1  ON (MSEG.LIFNR=LFA1.LIFNR and LFA1.MANDT='200')
LEFT JOIN SCP.SAPSR3.MARA MARA  ON (MSEG.MATNR=MARA.MATNR and MARA.MANDT='200')
LEFT JOIN SCP.SAPSR3.T006A T006A ON (MSEG.ERFME=T006A.MSEHI and T006A.SPRAS='H' and T006A.MANDT='200')
LEFT JOIN SCP.SAPSR3.T134T T134T ON (MARA.MTART=T134T.MTART and T134T.SPRAS='H' and T134T.MANDT='200')
WHERE (MKPF.MANDT='200' )
	and (MKPF.BUDAT BETWEEN '$tol' AND '$ig')
	and (MSEG.BWART = 101 and MSEG.LGORT='A001')
	and (LEN(MSEG.EBELN) > 2)
ORDER BY 'Konyveles_ideje','Anyagszam' ASC";

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
