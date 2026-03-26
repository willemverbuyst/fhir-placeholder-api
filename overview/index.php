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

$sections = ['apps', 'packages', 'services'];
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Overview</title>
</head>
<body>
    <h1>Overview</h1>
    <?php if ($errorMessage !== null): ?>
        <p><?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?></p>
    <?php else: ?>
        <?php foreach ($sections as $section): ?>
            <h2><?php echo htmlspecialchars($section, ENT_QUOTES, 'UTF-8'); ?></h2>
            <ul>
                <?php
                $items = $data[$section] ?? [];
                if (!is_array($items)) {
                    $items = [];
                }
                ?>
                <?php foreach ($items as $item): ?>
                    <?php if (is_string($item)): ?>
                        <li><?php echo htmlspecialchars($item, ENT_QUOTES, 'UTF-8'); ?></li>
                    <?php endif; ?>
                <?php endforeach; ?>
            </ul>
        <?php endforeach; ?>
    <?php endif; ?>
</body>
</html>