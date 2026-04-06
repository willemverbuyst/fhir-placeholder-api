<?php
session_start();

if (isset($_POST['submit'])) {
  $organization = $_POST['organization'];
  $review = $_POST['review'];
  $author =$_SESSION['userid'];

  include "../classes/dbh.classes.php";
  include "../classes/new-review.classes.php";
  include "../classes/new-review-contr.classes.php";

  $newReview = new NewReviewContr($organization, $review, $author);
  $newReview->submitReview();

  header("location: ../reviews.php");
}
