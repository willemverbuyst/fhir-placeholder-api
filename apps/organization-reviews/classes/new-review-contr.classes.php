<?php

class NewReviewContr extends NewReview {
  private $organization;
  private $review;

  public function __construct($organization, $review) {
    $this->organization = $organization;
    $this->review = $review;
  }

  public function submitReview() {
    if ($this->emptyInput() == true) {
      header("location: ../index.php?error=emptyinput");
      exit();
    }
    
    $this->saveReview($this->organization, $this->review);
  }

  private function emptyInput() {
    $result = null;
    if (empty($this->organization) || empty($this->review)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }
}