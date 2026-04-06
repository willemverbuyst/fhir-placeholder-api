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
    <h1 class="text-center">sign in or sign up</h1>
    <form class="col-4 mx-auto border p-4 rounded">
      <div class="mb-3">
        <label for="formUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="formUsername" placeholder="Enter your username">
      </div>
      <div class="mb-3">
        <label for="formPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="formPassword" placeholder="Enter your password">
      </div>
      <button type="submit" class="btn btn-primary w-100">Sign In</button>
    </form>
    <form class="col-4 mx-auto border p-4 rounded">
      <div class="mb-3">
        <label for="formUsername" class="form-label">Username</label>
        <input type="text" class="form-control" id="formUsername" placeholder="Enter your username">
      </div>
      <div class="mb-3">
        <label for="formEmail" class="form-label">Email</label>
        <input type="email" class="form-control" id="formEmail" placeholder="Enter your email">
      </div>
      <div class="mb-3">
        <label for="formPassword" class="form-label">Password</label>
        <input type="password" class="form-control" id="formPassword" placeholder="Enter your password">
      </div>
      <div class="mb-3">
        <label for="formPassword" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="formConfirmPassword" placeholder="Confirm your password">
      </div>
      <button type="submit" class="btn btn-primary w-100">Sign Up</button>
    </form>
  </main>
</body>
</html>