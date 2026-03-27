<?php

declare(strict_types=1);

use PHPUnit\Framework\TestCase;

final class OrganizationOptionsTest extends TestCase
{
    public function test_it_returns_empty_array_when_entry_is_missing(): void
    {
        $decodedResponse = [
            'resourceType' => 'Bundle',
        ];

        self::assertSame([], extract_organization_options($decodedResponse));
    }

    public function test_it_returns_empty_array_when_entry_is_not_an_array(): void
    {
        $decodedResponse = [
            'entry' => 'not-an-array',
        ];

        self::assertSame([], extract_organization_options($decodedResponse));
    }

    public function test_it_extracts_names_from_valid_entries(): void
    {
        $decodedResponse = [
            'entry' => [
                ['resource' => ['name' => 'North Hospital']],
                ['resource' => ['name' => 'South Clinic']],
            ],
        ];

        self::assertSame(
            ['North Hospital', 'South Clinic'],
            extract_organization_options($decodedResponse)
        );
    }

    public function test_it_skips_entries_with_invalid_resource_shape(): void
    {
        $decodedResponse = [
            'entry' => [
                [],
                ['resource' => 'invalid-resource'],
                ['resource' => ['name' => 'Valid Org']],
            ],
        ];

        self::assertSame(['Valid Org'], extract_organization_options($decodedResponse));
    }

    public function test_it_skips_entries_with_missing_invalid_or_empty_name(): void
    {
        $decodedResponse = [
            'entry' => [
                ['resource' => []],
                ['resource' => ['name' => 123]],
                ['resource' => ['name' => '']],
                ['resource' => ['name' => 'Valid Org']],
            ],
        ];

        self::assertSame(['Valid Org'], extract_organization_options($decodedResponse));
    }

    public function test_it_preserves_order_and_duplicate_names(): void
    {
        $decodedResponse = [
            'entry' => [
                ['resource' => ['name' => 'Org A']],
                ['resource' => ['name' => 'Org B']],
                ['resource' => ['name' => 'Org A']],
            ],
        ];

        self::assertSame(
            ['Org A', 'Org B', 'Org A'],
            extract_organization_options($decodedResponse)
        );
    }

    public function test_it_handles_mixed_valid_and_invalid_entries_deterministically(): void
    {
        $decodedResponse = [
            'entry' => [
                ['resource' => ['name' => 'First Valid']],
                ['resource' => ['name' => '']],
                ['resource' => ['name' => 'Second Valid']],
                ['resource' => null],
                ['not_resource' => ['name' => 'Ignored']],
            ],
        ];

        self::assertSame(
            ['First Valid', 'Second Valid'],
            extract_organization_options($decodedResponse)
        );
    }
}
