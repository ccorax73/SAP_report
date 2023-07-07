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

$database = new Operations();
$conn = $database->dbConnection();

// Query
$qry = "SELECT TOP 1500 VBAP.VBELN as 'Rendeles',VBAP.POSNR as 'Tetel', VBAK.KUNNR as 'Mkod',KNA1.NAME1 as 'Megrendelo',VBAK.VDATU as 'Datum',VBAK.ERNAM as 'Rogzitette', VBAP.MATNR as 'Anyagszam',
VBAP.ARKTX as 'Megnev',VBAP.KWMENG as 'RendeltM', isnull(LIPS_SUM.LFUMGSUM,0) as 'KiszallM', VBAP.NETPR as 'Ear', VBAK.WAERK as 'Penznem',
(VBAP.KWMENG-ISNULL(LIPS_SUM.LFUMGSUM,0))  as 'NyitottM', VBAP.KPEIN as 'Aregyseg',(VBAP.KWMENG-isnull(LIPS_SUM.LFUMGSUM,0))/VBAP.KPEIN*VBAP.NETPR as 'Ertek'
FROM SCP.SAPSR3.VBAP VBAP LEFT JOIN SCP.SAPSR3.VBAK VBAK  ON (VBAP.VBELN=VBAK.VBELN and VBAP.MANDT='200' AND VBAP.ABGRU ='' AND VBAK.AUART<>'ZRE')
LEFT JOIN SCP.SAPSR3.KNA1 KNA1 ON (VBAK.KUNNR=KNA1.KUNNR and KNA1.MANDT='200')
LEFT JOIN SCP.SAPSR3.VBUP VBUP ON (VBAP.VBELN=VBUP.VBELN and VBAP.POSNR=VBUP.POSNR and VBUP.MANDT='200')
LEFT JOIN (SELECT LIPS.VGBEL as 'VGBELSUM',LIPS.VGPOS as 'VGPOSSUM', SUM(LIPS.LFIMG) as 'LFUMGSUM'
		FROM SCP.SAPSR3.LIPS LIPS JOIN SCP.SAPSR3.LIKP LIKP ON (LIPS.VBELN = LIKP.VBELN AND LIPS.MANDT='200' AND LIKP.WADAT_IST <> '00000000' AND LIKP.MANDT='200')
		GROUP BY LIPS.VGBEL,LIPS.VGPOS) LIPS_SUM
	ON (LIPS_SUM.VGBELSUM=VBAK.VBELN and LIPS_SUM.VGPOSSUM=VBAP.POSNR)
WHERE (VBAK.MANDT='200')
	AND ((VBAP.KWMENG-isnull(LIPS_SUM.LFUMGSUM,0))>0 )
	AND VBUP.GBSTA <> 'C'
ORDER BY 'Megrendelo','Rendeles','Tetel'";

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
