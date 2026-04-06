<?php
class NewReview extends Dbh {

  protected function saveReview($organization, $review, $author) {
      $stmt = $this->connect()->prepare("INSERT INTO reviews (reviews_organization, reviews_review, reviews_author) VALUES (?, ?, ?);");

      if (!$stmt->execute([$organization, $review, $author])) {
        $stmt = null;
        header("location: ../index.php?error=stmtfailed");
        exit();
      }

      $stmt = null;
  }
}