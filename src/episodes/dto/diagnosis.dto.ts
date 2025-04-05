import { ApiProperty } from '@nestjs/swagger';

class ReferenceDto {
  @ApiProperty({ type: String })
  reference: string;
}

class CodeableReferenceDto {
  @ApiProperty({ type: ReferenceDto })
  reference: ReferenceDto;
}

export class DiagnosisEntryDto {
  @ApiProperty({ type: CodeableReferenceDto, isArray: true })
  condition: CodeableReferenceDto[];
}
