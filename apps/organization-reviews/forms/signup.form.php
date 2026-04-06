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