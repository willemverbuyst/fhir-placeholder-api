import { ApiProperty } from '@nestjs/swagger';
import { CodeableReference } from 'fhir/r5';
import { ReferenceDto } from './reference.dto';

export class CodeableReferenceDto implements CodeableReference {
  @ApiProperty({ type: ReferenceDto })
  reference: ReferenceDto;
}
