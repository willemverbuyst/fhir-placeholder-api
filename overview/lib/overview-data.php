<?php

declare(strict_types=1);

/**
 * @return array{ok: true, data: array<string, mixed>}|array{ok: false, error: string}
 */
function loadOverviewFile(string $jsonPath): array
{
    $jsonContent = file_get_contents($jsonPath);
    if ($jsonContent === false) {
        return [
            'ok' => false,
            'error' => 'Unable to read overview.json.',
        ];
    }

    try {
        /** @var mixed $decoded */
        $decoded = json_decode($jsonContent, true, 512, JSON_THROW_ON_ERROR);
    } catch (JsonException) {
        return [
            'ok' => false,
            'error' => 'Invalid JSON in overview.json.',
        ];
    }

    if (!is_array($decoded)) {
        return [
            'ok' => false,
            'error' => 'Invalid JSON root in overview.json.',
        ];
    }

    return [
        'ok' => true,
        'data' => validateOverviewSchema($decoded),
    ];
}

/**
 * @param array<string, mixed> $decoded
 * @return array<string, mixed>
 */
function validateOverviewSchema(array $decoded): array
{
    $title = isset($decoded['title']) && is_string($decoded['title']) ? $decoded['title'] : 'Overview';
    $about = isset($decoded['about']) && is_string($decoded['about']) ? $decoded['about'] : '';
    $createdAt = isset($decoded['created_at']) && is_string($decoded['created_at']) ? $decoded['created_at'] : '';

    $sectionsRaw = isset($decoded['sections']) && is_array($decoded['sections']) ? $decoded['sections'] : [];
    $dependenciesRaw = isset($decoded['dependencies']) && is_array($decoded['dependencies']) ? $decoded['dependencies'] : [];

    return [
        'title' => $title,
        'about' => $about,
        'created_at' => $createdAt,
        'sections' => normalizeSections($sectionsRaw),
        'dependencies' => normalizeDependencies($dependenciesRaw),
    ];
}

/**
 * @param array<string, mixed> $sectionsRaw
 * @return array<string, array<string, string>>
 */
function normalizeSections(array $sectionsRaw): array
{
    $sections = [];

    foreach ($sectionsRaw as $sectionName => $sectionItems) {
        if (!is_string($sectionName) || !is_array($sectionItems)) {
            continue;
        }

        $sections[$sectionName] = [];
        foreach ($sectionItems as $itemName => $description) {
            if (!is_string($itemName)) {
                continue;
            }

            $sections[$sectionName][$itemName] = is_string($description) ? $description : '';
        }
    }

    return $sections;
}

/**
 * @param array<string, mixed> $dependenciesRaw
 * @return array<string, array<string, array<int, string>>>
 */
function normalizeDependencies(array $dependenciesRaw): array
{
    $dependencies = [];

    foreach ($dependenciesRaw as $sectionName => $sectionDependencies) {
        if (!is_string($sectionName) || !is_array($sectionDependencies)) {
            continue;
        }

        $dependencies[$sectionName] = [];

        foreach ($sectionDependencies as $itemName => $itemDependencies) {
            if (!is_string($itemName) || !is_array($itemDependencies)) {
                continue;
            }

            $dependencies[$sectionName][$itemName] = [];
            foreach ($itemDependencies as $dependencyName) {
                if (is_string($dependencyName)) {
                    $dependencies[$sectionName][$itemName][] = $dependencyName;
                }
            }
        }
    }

    return $dependencies;
}
