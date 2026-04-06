<?php
if (isset($_POST['submit'])) {
  $organization = $_POST['organization'];
  $review = $_POST['review'];

  include "../classes/dbh.classes.php";
  include "../classes/review.classes.php";
  include "../classes/new-review-contr.classes.php";

  $newReview = new NewReviewContr($organization, $review);
  $newReview->submitReview();

  header("location: ../index.php?error=none");
}
