import { ApiProperty } from '@nestjs/swagger';
import { HumanName } from 'fhir/r5';

export class HumanNameDto implements HumanName {
  @ApiProperty({
    type: String,
    description: "Family name (often called 'Surname')",
    example: 'Doe',
  })
  family: string;

  @ApiProperty({
    type: String,
    description: "Given names (not always 'first'). Includes middle names",
    example: 'John',
    isArray: true,
  })
  given: string[];
}
