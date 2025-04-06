import { ApiProperty } from '@nestjs/swagger';
import { ReferenceDto } from './reference.dto';

export class CodeableReferenceDto {
  @ApiProperty({ type: ReferenceDto })
  reference: ReferenceDto;
}
