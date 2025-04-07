import { ApiProperty } from '@nestjs/swagger';
import { Annotation } from 'fhir/r5';

export class AnnotationDto implements Annotation {
  @ApiProperty({
    type: String,
    description: 'The annotation - text content (as markdown)',
    example: 'Some text content',
  })
  text: string;
}
