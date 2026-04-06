<?php

include "./classes/dbh.classes.php";
include "./classes/reviews.classes.php";
include "./classes/reviews-contr.classes.php";

$reviewsContr = new ReviewsContr();
$reviews = $reviewsContr->showReviews();

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
      <ul class="list-group d-flex flex-column gap-4 mx-auto">
        <?php foreach ($reviews as $review) { ?>
          <li class="card p-3" style="width: 400px;">
            <div class="card-body">
              <h5 class="card-title"><?php echo $review['reviews_title']; ?></h5>
              <h6 class="card-subtitle mb-2 text-muted"><?php echo $review['reviews_organization']; ?></h6>
              <p class="card-text"><?php echo $review['reviews_review']; ?></p>
              <p class="card-text text-italic"><em>
                <?php echo 'by '.$review['users_uid'].' on '.$review['reviews_date']; ?>
              </em></p>
            </div>
          </li>
        <?php } ?>
      </ul>
    <?php } ?>
  </main>
</body>
</html>