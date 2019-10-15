<?php

require_once 'functions.php';
set_exception_handler('error_handler');
startup();
require_once 'db_connection.php';




$attempts = 17;
$accuracy = 53;

$insertToTableQuery = "INSERT INTO `highScore`
  (`rank`, `name`, `attempts`, `accuracy`)
  VALUES (11, 'work', $attempts, $accuracy)";

$insertToTableResult = mysqli_query($conn, $insertToTableQuery);

if(!$insertToTableResult){
  throw new Exception("failed to insert to table" . $insertToTableResult);
}

?>
