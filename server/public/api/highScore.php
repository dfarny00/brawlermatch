<?php

require_once 'functions.php';
set_exception_handler('error_handler');
startup();
require_once 'db_connection.php';

$scoreQuery = "SELECT id, name, accuracy, added
  FROM `highScore`
  WHERE DATE(added) = DATE(CURRENT_TIMESTAMP)
  ORDER BY accuracy DESC
  LIMIT 5";

$scoreResult = mysqli_query($conn, $scoreQuery);

if(!$scoreResult){
  throw new Exception("Connect Failed: " . mysqli_error($conn));
}

$row_cnt = mysqli_num_rows($scoreResult);
if( $row_cnt === 0) {
  throw new Exception("No Rows returned");
}

$output = [];

while($row = mysqli_fetch_assoc($scoreResult)) {
  $output[] = $row;
}

$json_output = json_encode($output);
print($json_output);

?>
