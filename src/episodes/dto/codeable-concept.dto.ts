import { ApiProperty } from '@nestjs/swagger';

class CodingDto {
  @ApiProperty({
    type: String,
    description: 'The code of the type',
    example: 'hacc',
  })
  code: string;

  @ApiProperty({
    type: String,
    description: 'The system of the type',
    example: 'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
  })
  system: string;

  @ApiProperty({
    type: String,
    description: 'The display of the type',
    example: 'Home and Community Care',
  })
  display: string;
}

export class CodeableConceptDto {
  @ApiProperty({ type: CodingDto, isArray: true })
  coding: CodingDto[];
}
