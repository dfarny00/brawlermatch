<?php

require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$bodyData = file_get_contents('php://input');
$obj = json_decode($bodyData);
$resultArray = (array) $obj;



$name = $resultArray['name'];
$accuracy = $resultArray['accuracy'];
$dateOffset = $resultArray['dateOffset'];

var_dump("dateOffset:", $dateOffset);

$insertToTableQuery = "INSERT INTO `highScore`
  (`name`, `accuracy`)
  VALUES ('$name', $accuracy)";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

?>
