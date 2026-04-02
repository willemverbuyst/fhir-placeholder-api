<?php

include 'config/database.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['query'] ?? '');

if ($query === '') {
    echo json_encode([]);
    exit;
}

try {
    // $statement = $pdo->prepare('SELECT * FROM practitioner WHERE id::text LIKE ?');
    $statement = $pdo->prepare(<<<'SQL'
    SELECT *
    FROM practitioner p
    WHERE (
      SELECT LOWER(
        string_agg(
          TRIM(
            COALESCE(name->>'family', '') || ' ' ||
            COALESCE(
              array_to_string(
                ARRAY(
                  SELECT jsonb_array_elements_text(
                    COALESCE(name->'given', '[]'::jsonb)
                  )
                ),
                ' '
              ),
              ''
            )
          ),
          ' '
        )
      )
      FROM jsonb_array_elements(
        COALESCE(p.resource->'name', '[]'::jsonb)
      ) AS name
    ) ILIKE :search;
    SQL
    );
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to prepare search query']);
    exit;
}

$searchPattern = '%'.$query.'%';

try {
    $statement->execute([$searchPattern]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to execute search query']);
    exit;
}

$gps = $statement->fetchAll(PDO::FETCH_ASSOC);

echo json_encode($gps);
