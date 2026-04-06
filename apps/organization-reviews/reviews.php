<?php include 'config/database.php';
$sql = 'SELECT * FROM reviews';
$result = mysqli_query($conn, $sql);
$reviews = mysqli_fetch_all($result, MYSQLI_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Org Reviews | Reviews</title>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
  <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.js"></script>
</head>
<body class="container p-4">
  <?php include 'inc/header.php'; ?>
  <main class="container d-flex flex-column gap-4 p-4">
    <h1 class="text-center">reviews</h1>
    <?php if (empty($reviews)) { ?>
      <p>No reviews found</p>
    <?php } else { ?>
      <ul class="list-group d-flex flex-column gap-4">
        <?php foreach ($reviews as $review) { ?>
          <li class="list-group-item">
            <h2 class="text-lg font-bold"><?php echo $review['organization']; ?></h2>
            <p class="overflow-hidden text-ellipsis whitespace-nowrap"><?php echo $review['body']; ?></p>
            <p class="text-sm text-gray-500 italic">
              <?php echo 'by '.$review['author'].' on '.$review['date']; ?>
            </p>
          </li>
        <?php } ?>
      </ul>
    <?php } ?>
  </main>
</body>
</html>