import { ApiProperty } from '@nestjs/swagger';
import { Condition } from 'fhir/r5';
import { AnnotationDto } from '../../dto/annotation.dto';
import { CodeableConceptDto } from '../../dto/codeable-concept.dto';
import { ReferenceDto } from '../../dto/reference.dto';

export class ConditionDto implements Condition {
  @ApiProperty({
    type: String,
    description: 'The id of the condition',
    example: '12345-67890',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The type of the resource',
    default: 'Condition',
  })
  resourceType: 'Condition';

  @ApiProperty({
    type: ReferenceDto,
    description: 'The patient reference',
    example: { reference: 'Patient/12345-67890' },
  })
  subject: ReferenceDto;

  @ApiProperty({
    type: CodeableConceptDto,
    description: 'The clinical status of the condition',
    example: {
      coding: [
        {
          code: 'active',
          system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
          display: 'Active',
        },
      ],
    },
  })
  clinicalStatus: CodeableConceptDto;

  @ApiProperty({
    type: AnnotationDto,
    description: 'Additional information about the Condition',
    example: [{ text: 'Something about the condition' }],
    isArray: true,
  })
  note: AnnotationDto[];
}
