<?php

require_once('functions.php');
set_exception_handler('error_handler');
require_once('db_connection.php');

$bodyData = file_get_contents('php://input');
$obj = json_decode($bodyData);
$resultArray = (array) $obj;

$name = $resultArray['name'];
$attempts = $resultArray['attempts'];
$accuracy = $resultArray['accuracy'];

$insertToTableQuery = "INSERT INTO `highScore`
  (`name`, `attempts`, `accuracy`)
  VALUES ('$name', $attempts, $accuracy)";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

?>
