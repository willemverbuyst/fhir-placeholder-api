import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'fhir/r5';
import { HumanNameDto } from 'src/dto/human-name-dto';
import { Gender } from '../../db/resources/gender';

export class PatientDto implements Patient {
  @ApiProperty({
    type: String,
    description: 'The id of the patient',
    example: '12345-67890',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The type of the resource',
    default: 'Patient',
  })
  resourceType: 'Patient';

  @ApiProperty({
    type: String,
    pattern:
      '([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?',
    description: 'The date of birth for the individual',
    example: '2025-02-09',
  })
  birthDate: string;

  @ApiProperty({
    enum: Gender,
    description: 'male | female | other | unknown',
    example: 'female',
  })
  gender: Gender;

  @ApiProperty({
    type: HumanNameDto,
    description: 'A name associated with the patient',
    example: [{ family: 'Doe', given: ['John'] }],
  })
  name: HumanNameDto[];
}
