import { ApiProperty } from '@nestjs/swagger';
import { ContactPoint } from 'fhir/r5';
import { ContactSystem, ContactUse } from '../db/helpers/contactPoint';

export class ContactPointDto implements ContactPoint {
  @ApiProperty({
    enum: ContactUse,
    description:
      'home | work | temp | old | mobile - purpose of this contact point',
    example: ContactUse.HOME,
  })
  use: ContactUse;

  @ApiProperty({
    enum: ContactSystem,
    description: 'phone | fax | email | pager | url | sms | other',
    example: ContactSystem.EMAIL,
  })
  system: ContactSystem;

  @ApiProperty({
    type: String,
    description: 'The actual contact point details',
    example: 'joh@doe.io',
  })
  value: string;
}
