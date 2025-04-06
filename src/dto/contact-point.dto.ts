import { ApiProperty } from '@nestjs/swagger';
import { ContactSystem, ContactUse } from 'src/db/helpers/contactPoint';

export class ContactPointDto {
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
