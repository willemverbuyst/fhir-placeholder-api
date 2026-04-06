<?php
if (isset($_POST['submit'])) {
  $username = $_POST['uid'];
  $email = $_POST['email'];
  $password = $_POST['pwd'];
  $passwordConfirm = $_POST['pwdconfirm'];

  include "../classes/dbh.classes.php";
  include "../classes/signup.classes.php";
  include "../classes/signup-contr.classes.php";

  $signup = new SignupContr($username, $email, $password, $passwordConfirm);
  $signup->signupUser();

  header("location: ../index.php?error=none");
}
