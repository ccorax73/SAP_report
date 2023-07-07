<?php

class Operations
{
    //update credentials
    private $db_username = 'xxxx';
    private $db_password = 'xxxx';




    public function dbConnection()
    {
        try {
            // update server IP and database
          $conn = odbc_connect("Driver={Adaptive Server Enterprise};Server=xx.xx.xx.xx;Port=4909;Database='xxxx';EncryptPassword=1;", $this->db_username, $this->db_password);		 
          return $conn;
        } 
		catch (Exception $e){
            echo "Database Connection Error \r\n";
			return null;					
        }
		
    }
}

?>
