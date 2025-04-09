import { ApiProperty } from '@nestjs/swagger';
import { CodeableConceptDto } from '../../dto/codeable-concept.dto';

export class CommunicationDto {
  @ApiProperty({
    type: Boolean,
    description: '	Language preference indicator',
    example: true,
    default: true,
  })
  preferred: boolean;

  @ApiProperty({
    type: CodeableConceptDto,
    description:
      'The language which can be used to communicate with the patient about his or her health',
    example: {
      coding: [
        {
          code: 'en-GB',
          system: 'urn:ietf:bcp:47',
          display: 'English (Great Britain)',
        },
      ],
    },
  })
  language: CodeableConceptDto;
}
