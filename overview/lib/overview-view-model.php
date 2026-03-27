<?php

declare(strict_types=1);

/**
 * @param  array<int, string>  $sectionNames
 */
function buildSectionSubtitle(array $sectionNames): string
{
    if ($sectionNames === []) {
        return 'No sections found.';
    }

    if (count($sectionNames) <= 2) {
        return 'High-level view of '.implode(' and ', $sectionNames);
    }

    $namesForTitle = $sectionNames;
    $lastSectionName = array_pop($namesForTitle);

    return 'High-level view of '.implode(', ', $namesForTitle).' and '.$lastSectionName;
}

/**
 * @param array{
 *   title: string,
 *   about: string,
 *   created_at: string,
 *   sections: array<string, array<string, string>>,
 *   dependencies: array<string, array<string, array<int, string>>>
 * } $overviewData
 * @return array{
 *   data: array{
 *     title: string,
 *     about: string,
 *     created_at: string,
 *     sections: array<string, array<string, string>>,
 *     dependencies: array<string, array<string, array<int, string>>>
 *   },
 *   sections: array<int, string>,
 *   title: string,
 *   dependencies: array<string, array<string, array<int, string>>>
 * }
 */
function buildOverviewViewModel(array $overviewData): array
{
    $sectionNames = array_keys($overviewData['sections']);

    return [
        'data' => $overviewData,
        'sections' => $sectionNames,
        'title' => buildSectionSubtitle($sectionNames),
        'dependencies' => $overviewData['dependencies'],
    ];
}
