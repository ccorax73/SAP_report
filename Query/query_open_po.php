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
$qry = "SELECT AFKO.PLNNR as 'Acsoport',AFPO.ABLAD as 'Lerakodohely',AFKO.AUFNR  as 'Rendeles_szama', AFKO.GSTRP as 'Inditas' , AFKO.GLTRP  as 'Vege', AFPO.MATNR as 'Aszam', MAKT.MAKTX as 'Megnev',
 AFKO.GAMNG as 'RendeltM', AFPO.WEMNG as 'VisszaJelM', AFKO.GAMNG-AFPO.WEMNG as 'NyitottM', T006A.MSEH3 as 'BME'
FROM SCP.SAPSR3.AFKO AFKO  LEFT JOIN SCP.SAPSR3.T006A T006A ON (AFKO.GMEIN=T006A.MSEHI and T006A.SPRAS='H' and T006A.MANDT='200'),
	SCP.SAPSR3.AFPO AFPO,
	SCP.SAPSR3.AUFK AUFK LEFT JOIN SCP.SAPSR3.JEST JEST ON (AUFK.OBJNR=JEST.OBJNR and JEST.MANDT='200'),
	SCP.SAPSR3.MAKT MAKT

WHERE (AFKO.MANDT='200' and AFPO.MANDT='200' and AUFK.MANDT='200' and MAKT.MANDT='200' and MAKT.SPRAS='H')
	and (AFPO.AUFNR=AFKO.AUFNR and AUFK.AUFNR=AFKO.AUFNR and AFPO.MATNR=MAKT.MATNR)
	and (AUFK.IDAT2='00000000' and AUFK.IDAT3='00000000' and AUFK.LOEKZ='')
	and AUFK.AUART<>'ZKAR'
	and JEST.STAT='I0002'
	and AFKO.GAMNG > AFPO.WEMNG
ORDER BY 'Acsoport','Aszam','Inditas'";

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
