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
      <?php include 'forms/logout.form.php'; ?>
    <?php else: ?>
      <h1 class="text-center">login or sign up</h1>
      <?php include 'forms/login.form.php'; ?>
      <?php include 'forms/signup.form.php'; ?>
    <?php endif; ?>
  </main>
</body>
</html>