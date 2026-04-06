<?php
session_start();
$isLoggedIn = isset($_SESSION["useruid"]);
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Org Reviews | Home</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
</head>
<body class="container p-4">
  <?php include 'inc/header.php'; ?>
  <main class="container d-flex flex-column gap-4 p-4">
    <?php if ($isLoggedIn): ?>
      <p class="text-center">You are logged in as <?php echo htmlspecialchars($_SESSION["useruid"]); ?>!</p>
      <form class="col-4 mx-auto" action="/includes/logout.inc.php" method="POST">
        <button type="submit" class="btn btn-outline-danger w-100">LOG OUT</button>
      </form>
    <?php else: ?>
      <h1 class="text-center">sign in or sign up</h1>
      <form class="col-4 mx-auto border p-4 rounded" action="/includes/login.inc.php" method="POST">
        <div class="mb-3">
          <label for="uid" class="form-label">Username</label>
          <input type="text" class="form-control" name="uid" placeholder="Enter your username">
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">Password</label>
          <input type="password" class="form-control" name="pwd" placeholder="Enter your password">
        </div>
        <button type="submit" name="submit" class="btn btn-primary w-100">LOGIN</button>
      </form>
      <?php
        if (isset($_GET["error"])) {
          if ($_GET["error"] == "emptyinput") {
            echo "<p class='text-center text-danger'>Please fill in all fields!</p>";
          } elseif ($_GET["error"] == "stmtfailed") {
            echo "<p class='text-center text-danger'>Something went wrong, try again!</p>";
          } elseif ($_GET["error"] == "usernotfound") {
            echo "<p class='text-center text-danger'>Incorrect login information!</p>";
          }
        }
      ?>
      <form class="col-4 mx-auto border p-4 rounded" action="/includes/signup.inc.php" method="POST">
        <div class="mb-3">
          <label for="uid" class="form-label">Username</label>
          <input type="text" class="form-control" name="uid" placeholder="Enter your username">
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input type="email" class="form-control" name="email" placeholder="Enter your email">
        </div>
        <div class="mb-3">
          <label for="pwd" class="form-label">Password</label>
          <input type="password" class="form-control" name="pwd" placeholder="Enter your password">
        </div>
        <div class="mb-3">
          <label for="pwdconfirm" class="form-label">Confirm Password</label>
          <input type="password" class="form-control" name="pwdconfirm" placeholder="Confirm your password">
        </div>
        <button type="submit" name="submit" class="btn btn-primary w-100">SIGN UP</button>
      </form>
      <?php
        if (isset($_GET["error"])) {
          if ($_GET["error"] == "emptyinput") {
            echo "<p class='text-center text-danger'>Please fill in all fields!</p>";
          } elseif ($_GET["error"] == "stmtfailed") {
            echo "<p class='text-center text-danger'>Something went wrong, try again!</p>";
          } elseif ($_GET["error"] == "usernametaken") {
            echo "<p class='text-center text-danger'>Username or email already taken!</p>";
          } elseif ($_GET["error"] == "passwordsdontmatch") {
            echo "<p class='text-center text-danger'>Passwords don't match!</p>";
          } elseif ($_GET["error"] == "email") {
            echo "<p class='text-center text-danger'>Invalid email address!</p>";
          }
        }
      ?>
    <?php endif; ?>
  </main>
</body>
</html>