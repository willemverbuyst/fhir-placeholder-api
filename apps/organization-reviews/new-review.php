<?php include 'config/database.php';
  $name = $email = $body = "";
  $name_error = $email_error = $body_error = "";

  if (isset($_POST['submit'])) {
    if (empty($_POST['name'])) {
      $name_error = "Name is required";
    } else {
      $name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_SPECIAL_CHARS);
    }
    
    if (empty($_POST['email'])) {
      $email_error = "Email is required";
    } else {
      $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    }
    
    if (empty($_POST['body'])) {
      $body_error = "Review is required";
    } else {
      $body = filter_input(INPUT_POST, 'body', FILTER_SANITIZE_SPECIAL_CHARS);
    }
    
    if (empty($name_error) && empty($email_error) && empty($body_error)) {
      $sql = "INSERT INTO review (name, email, body) VALUES ('{$name}', '{$email}', '{$body}')";
      if (mysqli_query($conn, $sql)) {
        header("Location: reviews.php");
        exit();
      } else {
        echo "Error: " . $sql . "<br>" . mysqli_error($conn);
      }
    }
  }
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Organization Reviews</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss-browser/4.1.13/index.global.js" integrity="sha512-RAOoTi4JqATUmfyj+oyxwAo3JtUeZwLsBpNisDcY5VzvXZARuuaE5zfwUCDVa2LBBUax70uBlO4+eZA1Y/tk0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>
<body class="w-screen flex flex-col items-center justify-center bg-gray-100 p-10 ">
  <?php include 'inc/header.php'; ?>
  <main class="flex flex-col items-center justify-center gap-4">
    <h2 class="text-xl text-center">new review</h2>
    <form class="flex flex-col gap-6 w-[400px]" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="name">Name</label>
        <input class="border border-gray-300 rounded-md p-2 bg-white" type="text" name="name" id="name">
        <p class="text-red-500"><?php echo $name_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="email">Email</label>
        <input class="border border-gray-300 rounded-md p-2 bg-white" type="email" name="email" id="email">
        <p class="text-red-500"><?php echo $email_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <label class="text-gray-500 font-bold" for="body">Review</label>
        <textarea class="border border-gray-300 rounded-md p-2 bg-white" name="body" id="body"></textarea>
        <p class="text-red-500"><?php echo $body_error; ?></p>
      </div>
      <div class="flex flex-col gap-2">
        <input class="bg-black text-white rounded-md p-2" type="submit" name="submit" value="Submit">
      </div>
    </form>
  </main>
</body>
</html>