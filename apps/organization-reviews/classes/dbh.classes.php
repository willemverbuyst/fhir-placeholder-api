<?php

class Dbh {
  private $host = "organization-reviews-db";
  private $user = "app_user";
  private $pwd = "secret";
  private $dbName = "app_db";

  protected function connect() {
    try {
      $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->dbName;
      $pdo = new PDO($dsn, $this->user, $this->pwd);
      return $pdo;
    } catch (PDOException $e) {
      print("Connection failed: " . $e->getMessage()."<br/>");
      die();
    }
  }
}
