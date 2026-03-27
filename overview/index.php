<?php

$jsonPath = __DIR__ . '/overview.json';
$jsonContent = @file_get_contents($jsonPath);
$data = null;
$errorMessage = null;

if ($jsonContent === false) {
    $errorMessage = 'Unable to read overview.json.';
} else {
    $decoded = json_decode($jsonContent, true);
    if (!is_array($decoded)) {
        $errorMessage = 'Invalid JSON in overview.json.';
    } else {
        $data = $decoded;
    }
}

$sections = $data["sections"] !== null && is_array($data["sections"]) ? array_keys($data["sections"]) : [];
if (!empty($sections)) {
    if (count($sections) > 2) {
        $sections_for_title = $sections; // make a copy to preserve the original
        $last = array_pop($sections_for_title);
        $title = "High-level view of " . implode(', ', $sections_for_title) . " and " . $last;
    } else {
        $title = "High-level view of " . implode(' and ', $sections);
    }
} else {
    $title = "No sections found.";
}

$dependencies = $data["dependencies"] !== null && is_array($data["dependencies"]) ? $data["dependencies"] : [];

?>
<?php require __DIR__ . '/views/overview-page.php'; ?>