<?php

include 'config/database.php';

header('Content-Type: application/json; charset=utf-8');

$query = trim($_GET['query'] ?? '');
$criterion = $_GET['criterion'] ?? 'name';
$page = isset($_GET['page']) ? max(1, intval($_GET['page'])) : 1;
$limit = isset($_GET['limit']) ? max(1, intval($_GET['limit'])) : 10;
$offset = isset($_GET['offset']) ? max(0, intval($_GET['offset'])) : ($page - 1) * $limit;

if ($query === '') {
    echo json_encode([]);
    exit;
}

function get_practitioner_by_name($search, $limit, $offset) {
    global $pdo;

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
        ) ILIKE :search
        LIMIT :limit OFFSET :offset;
        SQL
        );
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare name search query']);
        return [];
    }

    $searchPattern = '%'.$search.'%';

    try {
        $statement->execute(['search' => $searchPattern, 'limit' => $limit, 'offset' => $offset]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to execute name search query']);
        return [];
    }

    $gps = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($gps) {
        return $gps;
    }

    return [];
}

function get_practitioner_by_email($search, $limit, $offset) {
    global $pdo;

    try {
        $statement = $pdo->prepare(<<<'SQL'
        SELECT p.*, COUNT(*) OVER() AS total_count
        FROM practitioner p
        WHERE EXISTS (
          SELECT 1
          FROM jsonb_array_elements(
            COALESCE(p.resource->'telecom', '[]'::jsonb)
          ) AS telecom
          WHERE telecom->>'system' = 'email'
            AND telecom->>'value' ILIKE :search
        )
        LIMIT :limit OFFSET :offset;
        SQL
        );
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare email search query']);
        return [];
    }

    $searchPattern = '%'.$search.'%';

    try {
        $statement->execute(['search' => $searchPattern, 'limit' => $limit, 'offset' => $offset]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to execute email search query']);
        return [];
    }

    $gps = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($gps) {
        return $gps;
    }

    return [];
}

function get_practitioner_by_phone($search, $limit, $offset) {
    global $pdo;

    try {
        $statement = $pdo->prepare(<<<'SQL'
        SELECT *
        FROM practitioner p
        WHERE (
          SELECT LOWER(
            string_agg(
              TRIM(
                COALESCE(telecom->>'value', '') || ' ' ||  ''
                ),
              ' '
              )
            )
          FROM jsonb_array_elements(
            COALESCE(p.resource->'telecom', '[]'::jsonb)
          ) AS telecom
          WHERE telecom->>'system' = 'phone'
        ) ILIKE :search
        LIMIT :limit OFFSET :offset;
        SQL
        );
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare phone search query']);
        return [];
    }

    $searchPattern = '%'.$search.'%';

    try {
        $statement->execute(['search' => $searchPattern, 'limit' => $limit, 'offset' => $offset]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to execute phone search query']);
        return [];
    }

    $gps = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($gps) {
        return $gps;
    }

    return [];
}

function get_practitioner_by_organization($search, $limit, $offset) {
    global $pdo;

    try {
        $statement = $pdo->prepare(<<<'SQL'
        SELECT p.resource, p.id
        FROM organization o
        JOIN practitioner_role pr
        ON o.id = split_part(pr.resource #>> '{organization,reference}', '/', 2)::uuid
        JOIN practitioner p
        ON p.id = split_part(pr.resource #>> '{practitioner,reference}', '/', 2)::uuid
        WHERE LOWER(o.resource->>'name') ILIKE :search
        LIMIT :limit OFFSET :offset;
        SQL
        );
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare organization search query']);
        return [];
    }

    $searchPattern = '%'.$search.'%';

    try {
        $statement->execute(['search' => $searchPattern, 'limit' => $limit, 'offset' => $offset]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to execute organization search query']);
        return [];
    }

    $gps = $statement->fetchAll(PDO::FETCH_ASSOC);

    if ($gps) {
        return $gps;
    }

    return [];
}

function get_organization_name_by_practitioner_id($practitioner_id) {
    global $pdo;

    try {
        $orgStatement = $pdo->prepare(<<<'SQL'
        SELECT o.resource  AS organization
        FROM practitioner_role pr
        JOIN organization o
        ON o.id = split_part(pr.resource #>> '{organization,reference}', '/', 2)::uuid
        WHERE pr.resource #>> '{practitioner,reference}' = :id;
        SQL,
        );
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare search query']);
        return null;
    }
    
    try {
        $orgStatement->execute(['id' => "Practitioner/".$practitioner_id]);
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Failed to prepare search query']);
        return null;
    }

    $org = $orgStatement->fetch(PDO::FETCH_ASSOC);

    if ($org) {
        $orgResource = json_decode($org['organization'], true);
        return $orgResource['name'] ?? null;
    }

    return null;
}

$gps = [];

if ($criterion === 'name') {
    $gps = get_practitioner_by_name($query, $limit, $offset);
}

if ($criterion === 'email') {
    $gps = get_practitioner_by_email($query, $limit, $offset);
}

if ($criterion === 'phone') {
    $gps = get_practitioner_by_phone($query, $limit, $offset);
}

if ($criterion === 'organization') {
    $gps = get_practitioner_by_organization($query, $limit, $offset);
}

$formatted_gps = array_map(function($gp) {
    global $limit;

    $resource = json_decode($gp['resource']);
    $id = $gp['id'];
    $organization_name = get_organization_name_by_practitioner_id($id);
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
      'id' => $id,
      'name' => $displayName,
      'email' => implode(', ',  array_map(function($t) { return $t->value; }, $emails)),
      'phone' => implode(', ',  array_map(function($t) { return $t->value; }, $phones)),
      'organization' => $organization_name,
    ];
}, $gps);

$gps_with_page_count = [
    'data' => $formatted_gps,
    'totalPages' => isset($gps[0]['total_count']) ? ceil($gps[0]['total_count'] / $limit) : null
];
echo json_encode($gps_with_page_count);
