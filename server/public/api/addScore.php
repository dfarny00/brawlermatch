<?php

require_once 'functions.php';
session_start();
set_exception_handler('error_handler');
startup();
require_once 'db_connection.php';

define("INTERNAL", true);

if(!INTERNAL){
  exit("Direct access not allowed");
}

$bodyData = getBodyData();

$id = $bodyData['id'];

if(array_key_exists('sessionID', $_SESSION)){
  $sessionID = $_SESSION['sessionID'];
} else {
  $sessionID = false;
}

$startTransactionQuery = "START TRANSACTION";

$transactionResult = mysqli_query($conn, $startTransactionQuery);

if(!$transactionResult){
  throw new Exception("failed to start transaction");
}

if($sessionID === false){
  $insertQuery = "INSERT INTO `session` SET `created`=NOW()";
  $insertResult = mysqli_query($conn, $insertQuery);

  if(!$insertResult){
    throw new Exception("failed to insert to sessions" . $insertResult);
  }

  if(mysqli_affected_rows($conn) < 1){
    throw new Exception("affected rows is not equal to 1");
  }

  $sessionID = mysqli_insert_id($conn);
  $_SESSION['sessionID'] = $sessionID;
}

$attempts = 17;
$accuracy = 53;

$sessionInt = intval($sessionID);

$insertToTableQuery = "INSERT INTO `highScore`
  (`rank`, `name`, `attempts`, `accuracy`, `sessionID`)
  VALUES (8, 'why', $attempts, $accuracy, $sessionInt)";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

if(mysqli_affected_rows($conn) < 1){
  mysqli_query($conn, "ROLLBACK");
  throw new Exception("Affected rows not equal to 1");
}

mysqli_query($conn, "COMMIT");

?>
