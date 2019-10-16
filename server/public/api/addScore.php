<?php

require_once('functions.php');
set_exception_handler('error_handler');
// startup();
require_once('db_connection.php');



$bodyData = file_get_contents('php://input');
$obj = json_decode($bodyData);

$resultArray = (array) $obj;
// print_r($resultArray);

$name = $resultArray['name'];
$attempts = $resultArray['attempts'];
$accuracy = $resultArray['accuracy'];

var_dump("name: ", $name);
var_dump("attempts: ", $attempts);
var_dump("accuracy: ", $accuracy);

$insertToTableQuery = "INSERT INTO `highScore`
  (`name`, `attempts`, `accuracy`)
  VALUES ('$name', $attempts, $accuracy)";

var_dump("insertResult: ", $insertToTableQuery);

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

var_dump("insertResult: ", $insertToTableResult);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

?>
