<?php
session_start();

if (isset($_POST['submit'])) {
  $title = $_POST['title'];
  $organization = $_POST['organization'];
  $review = $_POST['review'];
  $author =$_SESSION['userid'];

  include "../classes/dbh.classes.php";
  include "../classes/new-review.classes.php";
  include "../classes/new-review-contr.classes.php";

  $newReview = new NewReviewContr($title,$organization, $review, $author);
  $newReview->submitReview();

  header("location: ../reviews.php");
}
