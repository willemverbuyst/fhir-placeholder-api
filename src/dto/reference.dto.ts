import { ApiProperty } from '@nestjs/swagger';
import { Reference } from 'fhir/r5';

export class ReferenceDto implements Reference {
  @ApiProperty({
    type: String,
    description: 'Literal reference, Relative, internal or absolute URL',
    example: 'ResourceType/12345-67890',
  })
  reference: string;
}
