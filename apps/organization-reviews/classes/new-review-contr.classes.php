<?php

class NewReviewContr extends NewReview {
  private $organization;
  private $review;
  private $author;
  private $title;

  public function __construct($title, $organization, $review, $author) {
    $this->title = $title;
    $this->organization = $organization;
    $this->review = $review;
    $this->author = $author;
  }

  public function submitReview() {
    if ($this->emptyInput() == true) {
      header("location: ../index.php?error=emptyinput");
      exit();
    }
    
    $this->saveReview($this->title, $this->organization, $this->review, $this->author);
  }

  private function emptyInput() {
    $result = null;
    if (empty($this->title) || empty($this->organization) || empty($this->review)) {
      $result = true;
    } else {
      $result = false;
    }
    return $result;
  }
}