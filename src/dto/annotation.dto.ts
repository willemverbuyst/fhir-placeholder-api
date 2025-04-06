import { ApiProperty } from '@nestjs/swagger';

export class AnnotationDto {
  @ApiProperty({
    type: String,
    description: 'The annotation - text content (as markdown)',
    example: 'Some text content',
  })
  text: string;
}
