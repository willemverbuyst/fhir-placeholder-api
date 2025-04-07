import { ApiProperty } from '@nestjs/swagger';
import { Coding } from 'fhir/r5';

export class CodingDto implements Coding {
  @ApiProperty({
    type: String,
    description: 'Symbol in syntax defined by the system',
    example: 'hacc',
  })
  code: string;

  @ApiProperty({
    type: String,
    description: 'Identity of the terminology system',
    example: 'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
  })
  system: string;

  @ApiProperty({
    type: String,
    description: 'The display of the type',
    example: 'Representation defined by the system',
  })
  display: string;
}
