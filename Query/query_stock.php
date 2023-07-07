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
$qry = "SELECT TOP 1500 MARDSUM.Aszam ,MAKT.MAKTX as 'Megnev',T134T.MTBEZ as 'Acsoport', MARDSUM.SzabadFelhk, MARDSUM.ZaroltK,MARDSUM.BermunkaK, T006A.MSEH3 as 'BME',TWEWT.EWBEZ as 'KulsoACS',
CASE WHEN (MARA.MTART = 'ZKSZ' OR MARA.MTART = 'ZFLK') THEN (MARDSUM.SzabadFelhk*MBEW.STPRS/MBEW.PEINH) ELSE (MARDSUM.SzabadFelhk*MBEW.VERPR/MBEW.PEINH) END as 'SzabadE',
CASE WHEN (MARA.MTART = 'ZKSZ' OR MARA.MTART = 'ZFLK') THEN (MARDSUM.ZaroltK*MBEW.STPRS/MBEW.PEINH) ELSE (MARDSUM.ZaroltK*MBEW.VERPR/MBEW.PEINH) END as 'ZaroltE',
CASE WHEN (MARA.MTART = 'ZKSZ' OR MARA.MTART = 'ZFLK') THEN (MARDSUM.BermunkaK*MBEW.STPRS/MBEW.PEINH) ELSE (MARDSUM.BermunkaK*MBEW.VERPR/MBEW.PEINH) END as 'BermunkaE',
MBEW.VERPR as 'MozgoAr', MBEW.PEINH as 'Aregyseg',MBEW.STPRS as 'StandardA' ,'HUF',MARA.MATKL as 'Csoport',T023T.WGBEZ as 'Csnev'
FROM
( SELECT MUNI.Aszam, SUM(MUNI.Szk) as 'SzabadFelhk',SUM(MUNI.Zk) as 'ZaroltK',SUM(MUNI.Bk) as 'BermunkaK' FROM
 (SELECT TOP 1500 MARD.MATNR as 'Aszam',MARD.LABST  as 'Szk', MARD.SPEME as 'Zk', 0 as 'Bk'
   FROM SCP.SAPSR3.MARD MARD
   WHERE (MARD.LGORT <> '9999') AND  (MARD.MANDT='200') AND (MARD.LABST+MARD.SPEME >0)
  UNION ALL
  SELECT TOP 1500 MSLB.MATNR as 'Aszam',0 as 'Szk', 0 as 'Zk',MSLB.LBLAB  as 'Bk'
   FROM SCP.SAPSR3.MSLB MSLB
   WHERE (MSLB.LBLAB>0) AND  (MSLB.MANDT='200')) MUNI
  GROUP BY MUNI.Aszam
) MARDSUM LEFT JOIN SCP.SAPSR3.MAKT MAKT  ON (MARDSUM.Aszam=MAKT.MATNR and MAKT.SPRAS='H' and MAKT.MANDT='200')
	LEFT JOIN SCP.SAPSR3.MARA MARA  ON (MARDSUM.Aszam=MARA.MATNR and MARA.MANDT='200')
	LEFT JOIN SCP.SAPSR3.T023T T023T  ON (T023T.MATKL=MARA.MATKL and T023T.MANDT='200' and T023T.SPRAS='H')
	LEFT JOIN SCP.SAPSR3.T134T T134T ON (MARA.MTART=T134T.MTART and T134T.SPRAS='H' and T134T.MANDT='200')
	LEFT JOIN SCP.SAPSR3.T006A T006A ON (MARA.MEINS=T006A.MSEHI and T006A.SPRAS='H' and T006A.MANDT='200')
	LEFT JOIN SCP.SAPSR3.MBEW MBEW  ON ( MARDSUM.Aszam=MBEW.MATNR and MBEW.MANDT='200')
	LEFT JOIN SCP.SAPSR3.TWEWT TWEWT  ON (MARA.EXTWG=TWEWT.EXTWG and TWEWT.MANDT='200')";

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
