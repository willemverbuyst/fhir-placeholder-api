<?php

class SignupContr extends Signup {
  private $uid;
  private $email;
  private $password;
  private $passwordConfirm;

  public function __construct($uid, $email, $password, $passwordConfirm) {
    $this->uid = $uid;
    $this->email = $email;
    $this->password = $password;
    $this->passwordConfirm = $passwordConfirm;
  }

  public function signupUser() {
    if ($this->emptyInput() == true) {
      header("location: ../index.php?error=emptyinput");
      exit();
    }

    if ($this->invalidUid() == true) {
      header("location: ../index.php?error=uid");
      exit();
    }

    if ($this->invalidEmail() == true) {
      header("location: ../index.php?error=email");
      exit();
    }

    if ($this->pwdMatch() == false) {
      header("location: ../index.php?error=passwordsdontmatch");
      exit();
    }

    if ($this->userExists() == true) {
      header("location: ../index.php?error=usertaken");
      exit();
    }

    $this->setUser($this->uid, $this->email, $this->password);

  }

  private function emptyInput() {
    $result = null;
    if (empty($this->uid) || empty($this->email) || empty($this->password) || empty($this->passwordConfirm)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }

  private function invalidEmail() {
    $result = null;
    if (!filter_var($this->email, FILTER_VALIDATE_EMAIL)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }

  private function invalidUid() {
    $result = null;
    if (!preg_match("/^[a-zA-Z0-9]*$/", $this->uid)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }

  private function pwdMatch() {
    $result = null;
    if ($this->password === $this->passwordConfirm) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }

  private function userExists() {
    $result = null;
    if ($this->isUserInDb($this->uid, $this->email) == true) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }
}