<?php

include 'config/database.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['query'] ?? '');

if ($query === '') {
    echo json_encode([]);
    exit;
}

try {
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

// $gp_resources = array_map(function($gp) {
//     return json_decode($gp['resource']);
// }, $gps);

$formatted_gps = array_map(function($gp) {
    $resource = json_decode($gp['resource']);
    $names = $resource->name ?? [];
    $formattedNames = array_map(function($name) {
        $family = trim((string) ($name->family ?? ''));
        $given = implode(' ', $name->given ?? []);

        return trim($family.' '.$given);
    }, $names);
    $displayName = implode(', ', array_filter($formattedNames));
    $emails = array_filter($resource->telecom ?? [], function($t) { return $t->system === 'email'; });
    $phones = array_filter($resource->telecom ?? [], function($t) { return $t->system === 'phone'; });

    return [
      'name' => $displayName,
      'email' => implode(', ',  array_map(function($t) { return $t->value; }, $emails)),
      'phone' => implode(', ',  array_map(futnction($t) { return $t->value; }, $phones)),
    ];
}, $gps);


echo json_encode($formatted_gps);
