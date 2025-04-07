import { ApiProperty } from '@nestjs/swagger';
import { Address } from 'fhir/r5';
import { AddressType, AddressUse } from '../db/helpers/address';

export class AddressDto implements Address {
  @ApiProperty({
    enum: AddressUse,
    description: 'home | work | temp | old | billing - purpose of this address',
    example: 'home',
  })
  use: AddressUse;

  @ApiProperty({
    enum: AddressType,
    description: 'postal | physical | both',
    example: 'postal',
  })
  type: AddressType;

  @ApiProperty({
    type: String,
    description: 'Street name, number, direction & P.O. Box etc.',
    example: 'FooBar Lane 6A',
    isArray: true,
  })
  line: string[];

  @ApiProperty({
    type: String,
    description: 'Name of city, town etc.',
    example: 'Rotterdam',
  })
  city: string;

  @ApiProperty({
    type: String,
    description: 'Sub-unit of country (abbreviations ok)',
    example: 'New Mexico',
  })
  state: string;

  @ApiProperty({
    type: String,
    description: 'Postal code for area',
    example: '4698RG',
  })
  postalCode: string;

  @ApiProperty({
    type: String,
    description: 'Country (e.g. may be ISO 3166 2 or 3 letter code)',
    example: 'Belgium',
  })
  country: string;
}
