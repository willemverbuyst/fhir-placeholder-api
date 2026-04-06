<?php

class ReviewsContr extends Reviews {
  public function showReviews() {
    $reviews = $this->getReviews();

    return $reviews;
  }
}