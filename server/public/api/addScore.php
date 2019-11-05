<?php

require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$bodyData = file_get_contents('php://input');
$obj = json_decode($bodyData);
$resultArray = (array) $obj;

date_default_timezone_set('UTC');

$name = $resultArray['name'];
$accuracy = $resultArray['accuracy'];
$dateOffset = ($resultArray['dateOffset'])/60;
$date = date('Y-m-d H:i:s');


if($dateOffset >=10){
  $formattedDate = '-' . $dateOffset . ":00";
} elseif($dateOffset >= 0) {
  $formattedDate = '-0' . $dateOffset . ":00";
} elseif($dateOffset <= 0){
  $formattedDate = '+0' . $dateOffset[1] . ":00";
} elseif($dateOffset <= -10){
  $formattedDate = '+' . $dateOffset . ":00";
}

$insertToTableQuery = "INSERT INTO `highScore`
  (`name`, `accuracy`,`added`)
  VALUES ('$name', $accuracy, CONVERT_TZ('$date','+00:00','$formattedDate'))";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

?>
