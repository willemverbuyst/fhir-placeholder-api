<?php

$gps = [
  ["name" => "John Doe", "email" => "john.doe@example.com"],
  ["name" => "Jane Doe", "email" => "jane.doe@example.com"],
  ["name" => "Jim Doe", "email" => "jim.doe@example.com"],
  ["name" => "Jill Doe", "email" => "jill.doe@example.com"],
];

$query = $_GET['query'] ?? '';

$results = [];

if ($query) {
  $results = array_filter($gps, function($gp) use ($query) {
    return stripos($gp["name"], $query) !== false;
  });
}

echo json_encode(array_values($results));

?>