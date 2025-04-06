import { ApiProperty } from '@nestjs/swagger';
import { CodingDto } from './coding.dto';

export class CodeableConceptDto {
  @ApiProperty({
    type: CodingDto,
    description: 'Code defined by a terminology system',
    isArray: true,
  })
  coding: CodingDto[];
}
