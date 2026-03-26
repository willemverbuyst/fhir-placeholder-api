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

$sections = $data !== null && is_array($data) ? array_keys($data) : [];
if (!empty($sections)) {
    if (count($sections) > 2) {
        $sections_for_title = $sections; // make a copy to preserve the original
        $last = array_pop($sections_for_title);
        $title = "High-level view of " . implode(', ', $sections_for_title) . " and " . $last . ".";
    } else {
        $title = "High-level view of " . implode(' and ', $sections) . ".";
    }
} else {
    $title = "No sections found.";
}
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss-browser/4.1.13/index.global.js" integrity="sha512-RAOoTi4JqATUmfyj+oyxwAo3JtUeZwLsBpNisDcY5VzvXZARuuaE5zfwUCDVa2LBBUax70uBlO4+eZA1Y/tk0A==" crossorigin="anonymous" referrerpolicy="no-referrer"></script>
    <title>Overview</title>
</head>
<body class="min-h-screen bg-slate-100 text-slate-900 antialiased">
    <main class="mx-auto w-full max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
        <div class="mb-8">
            <h1 class="text-3xl font-bold tracking-tight sm:text-4xl">Overview</h1>
            <p class="mt-2 text-sm text-slate-600"><?php echo htmlspecialchars($title, ENT_QUOTES, 'UTF-8'); ?></p>
        </div>

        <?php if ($errorMessage !== null): ?>
            <div class="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 shadow-sm">
                <?php echo htmlspecialchars($errorMessage, ENT_QUOTES, 'UTF-8'); ?>
            </div>
        <?php else: ?>
            <div class="grid gap-6 md:grid-cols-3">
                <?php foreach ($sections as $section): ?>
                    <?php
                    $items = $data[$section] ?? [];
                    if (!is_array($items)) {
                        $items = [];
                    }
                    ?>
                    <section class="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                        <h2 class="mb-4 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-700">
                            <?php echo htmlspecialchars($section, ENT_QUOTES, 'UTF-8'); ?>
                        </h2>

                        <?php if (count($items) === 0): ?>
                            <p class="text-sm text-slate-500">No items found.</p>
                        <?php else: ?>
                            <ul class="space-y-2">
                                <?php foreach ($items as $item): ?>
                                    <?php if (is_string($item)): ?>
                                        <li class="rounded-md bg-slate-50 px-3 py-2 text-sm text-slate-700 ring-1 ring-slate-200">
                                            <?php echo htmlspecialchars($item, ENT_QUOTES, 'UTF-8'); ?>
                                        </li>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </ul>
                        <?php endif; ?>
                    </section>
                <?php endforeach; ?>
            </div>
        <?php endif; ?>
    </main>
</body>
</html>