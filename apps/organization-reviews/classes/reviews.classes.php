<?php
class Reviews extends Dbh {

  protected function getReviews() {
      $stmt = $this->connect()->prepare("SELECT reviews.*, users.users_uid FROM reviews JOIN users ON users.users_id = reviews.reviews_author;");

      if (!$stmt->execute()) {
        $stmt = null;
        header("location: ../index.php?error=stmtfailed");
        exit();
      }

      $reviews = $stmt->fetchAll(PDO::FETCH_ASSOC);

      $stmt = null;

      return $reviews;
  }
}