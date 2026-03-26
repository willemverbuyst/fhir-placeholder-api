<?php include 'config/database.php'; 
  $sql= "SELECT * FROM reviews";
  $result = mysqli_query($conn, $sql);
  $reviews = mysqli_fetch_all($result, MYSQLI_ASSOC);
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
    <h2 class="text-xl text-center">reviews</h2>
    <?php if (empty($reviews)) : ?>
      <p>No reviews found</p>
    <?php else : ?>
      <ul class="grid grid-cols-1 gap-4">
        <?php foreach ($reviews as $review) : ?>
          <li class="bg-white p-4 rounded-md shadow-md w-[400px]">
            <h2 class="text-lg font-bold"><?php echo $review['organization']; ?></h2>
            <p class="overflow-hidden text-ellipsis whitespace-nowrap"><?php echo $review['body']; ?></p>
            <p class="text-sm text-gray-500 italic">
              <?php echo "by " . $review['author'] . " on " . $review['date']; ?>
            </p>
          </li>
        <?php endforeach; ?>
      </ul>
    <?php endif; ?>
  </main>
</body>
</html>