<?php

declare(strict_types=1);

require __DIR__.'/lib/overview-data.php';
require __DIR__.'/lib/overview-view-model.php';

$defaultData = [
    'title' => 'Overview',
    'about' => '',
    'created_at' => '',
    'sections' => [],
    'dependencies' => [],
];

$data = $defaultData;
$sections = [];
$title = buildSectionSubtitle($sections);
$dependencies = [];
$errorMessage = null;

$result = loadOverviewFile(__DIR__.'/overview.json');
if ($result['ok'] === false) {
    $errorMessage = $result['error'];
} else {
    $viewModel = buildOverviewViewModel($result['data']);
    $data = $viewModel['data'];
    $sections = $viewModel['sections'];
    $title = $viewModel['title'];
    $dependencies = $viewModel['dependencies'];
}
require __DIR__.'/views/overview-page.php';
