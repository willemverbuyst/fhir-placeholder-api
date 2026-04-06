<?php
class NewReview extends Dbh {

  protected function saveReview($organization, $review) {
      $stmt = $this->connect()->prepare("INSERT INTO reviews (organization, body) VALUES (?, ?);");

      if (!$stmt->execute([$organization, $review])) {
        $stmt = null;
        header("location: ../index.php?error=stmtfailed");
        exit();
      }

      $stmt = null;
  }
}