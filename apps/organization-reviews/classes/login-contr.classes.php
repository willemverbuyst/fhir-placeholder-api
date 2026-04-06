<?php

class LoginContr extends Login {
  private $uid;
  private $password;

  public function __construct($uid, $password) {
    $this->uid = $uid;
    $this->password = $password;
  }

  public function loginUser() {
    if ($this->emptyInput() == true) {
      header("location: ../index.php?error=emptyinput");
      exit();
    }
    
    $this->getUser($this->uid, $this->password);
  }

  private function emptyInput() {
    $result = null;
    if (empty($this->uid) || empty($this->password)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }
}