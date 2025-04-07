import { ApiProperty } from '@nestjs/swagger';
import { CodeableConcept } from 'fhir/r5';
import { CodingDto } from './coding.dto';

export class CodeableConceptDto implements CodeableConcept {
  @ApiProperty({
    type: CodingDto,
    description: 'Code defined by a terminology system',
    isArray: true,
  })
  coding: CodingDto[];
}
