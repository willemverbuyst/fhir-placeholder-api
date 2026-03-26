<?php
  define('DB_HOST', 'db');
  define('DB_NAME', 'app_db');
  define('DB_USER', 'app_user');
  define('DB_PASSWORD', 'secret');
  
  $conn = new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }
?>