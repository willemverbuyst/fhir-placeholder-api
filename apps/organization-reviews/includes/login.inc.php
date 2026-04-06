<?php
session_start();

if (isset($_POST['submit'])) {
  $username = $_POST['uid'];
  $password = $_POST['pwd'];

  include "../classes/dbh.classes.php";
  include "../classes/login.classes.php";
  include "../classes/login-contr.classes.php";

  $login = new LoginContr($username, $password);
  $login->loginUser();

  header("location: ../index.php?error=none");
}
