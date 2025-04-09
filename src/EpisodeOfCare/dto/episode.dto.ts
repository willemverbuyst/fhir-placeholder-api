import { ApiProperty } from '@nestjs/swagger';
import { EpisodeOfCare } from 'fhir/r5';
import { EpisodeOfCareStatus } from '../../db/resources/episode-of-care';
import { CodeableConceptDto } from '../../dto/codeable-concept.dto';
import { DiagnosisEntryDto } from './diagnosis.dto';

export class EpisodeDto implements EpisodeOfCare {
  @ApiProperty({
    type: String,
    description: 'The id of the episode',
    example: '12345-67890',
  })
  id: string;

  @ApiProperty({
    enum: EpisodeOfCareStatus,
    description: 'The status of the episode',
    example: EpisodeOfCareStatus.ACTIVE,
  })
  status: EpisodeOfCareStatus;

  @ApiProperty({
    type: String,
    description: 'The patient reference',
    example: { reference: 'Patient/12345-67890' },
  })
  patient: {
    reference: string;
  };

  @ApiProperty({
    type: DiagnosisEntryDto,
    description:
      '	The list of medical conditions that were addressed during the episode of care',
    example: {
      condition: [{ reference: { reference: 'Condition/12345-67890' } }],
    },
    isArray: true,
  })
  diagnosis: {
    condition: [
      {
        reference: {
          reference: string;
        };
      },
    ];
  }[];

  @ApiProperty({
    type: CodeableConceptDto,
    description: 'Type/class - e.g. specialist referral, disease management',
    example: {
      coding: [
        {
          code: 'hacc',
          system: 'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
          display: 'Home and Community Care',
        },
      ],
    },
    isArray: true,
  })
  type: CodeableConceptDto[];

  @ApiProperty({
    type: String,
    description: 'The resource type',
    example: 'EpisodeOfCare',
  })
  resourceType: 'EpisodeOfCare';
}
