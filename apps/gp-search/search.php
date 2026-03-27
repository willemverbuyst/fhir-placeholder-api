<?php
include 'config/database.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['query'] ?? '');

if ($query === '') {
  echo json_encode([]);
  exit;
}

$statement = $conn->prepare('SELECT * FROM gps WHERE name LIKE ?');

if ($statement === false) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to prepare search query']);
  exit;
}

$searchPattern = '%' . $query . '%';
$statement->bind_param('s', $searchPattern);

if (!$statement->execute()) {
  http_response_code(500);
  echo json_encode(['error' => 'Failed to execute search query']);
  $statement->close();
  exit;
}

$result = $statement->get_result();
$gps = $result->fetch_all(MYSQLI_ASSOC);
$statement->close();

echo json_encode($gps);
?>