import { ApiProperty } from '@nestjs/swagger';
import { CodeableReferenceDto } from '../../dto/codeable-reference.dto';

export class DiagnosisEntryDto {
  @ApiProperty({ type: CodeableReferenceDto, isArray: true })
  condition: CodeableReferenceDto[];
}
