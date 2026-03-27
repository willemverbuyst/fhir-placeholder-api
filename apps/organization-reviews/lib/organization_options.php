<?php

function extract_organization_options(array $decoded_response): array
{
    $organization_options = [];

    if (! isset($decoded_response['entry']) || ! is_array($decoded_response['entry'])) {
        return $organization_options;
    }

    foreach ($decoded_response['entry'] as $entry) {
        if (
            ! isset($entry['resource']) ||
            ! is_array($entry['resource']) ||
            ! isset($entry['resource']['name']) ||
            ! is_string($entry['resource']['name']) ||
            $entry['resource']['name'] === ''
        ) {
            continue;
        }

        $organization_options[] = $entry['resource']['name'];
    }

    return $organization_options;
}
