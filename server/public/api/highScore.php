<?php

require_once 'functions.php';
set_exception_handler('error_handler');
startup();
require_once 'db_connection.php';

$bodyData = file_get_contents('php://input');
$obj = json_decode($bodyData);
$resultArray = (array) $obj;

$dateOffset = ($_GET['dateOffset']) / 60;
$date = date('Y-m-d H:i:s');

if ($dateOffset >= 10) {
  $formattedDate = '-' . $dateOffset . ":00";
} elseif ($dateOffset >= 0) {
  $formattedDate = '-0' . $dateOffset . ":00";
} elseif ($dateOffset <= 0) {
  $formattedDate = '+0' . $dateOffset[1] . ":00";
} elseif ($dateOffset <= -10) {
  $formattedDate = '+' . $dateOffset . ":00";
}

$scoreQuery = "SELECT id, name, accuracy, added
  FROM `highScore`
  WHERE DATE(added) = DATE(CONVERT_TZ('$date','+00:00','$formattedDate'))
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
