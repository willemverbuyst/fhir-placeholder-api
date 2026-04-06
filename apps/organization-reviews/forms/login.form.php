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