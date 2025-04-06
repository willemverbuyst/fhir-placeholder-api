import { ApiProperty } from '@nestjs/swagger';
import { Patient } from 'fhir/r5';
import { AddressDto } from 'src/dto/address.dto';
import { ContactPointDto } from 'src/dto/contact-point.dto';
import { HumanNameDto } from 'src/dto/human-name-dto';
import { ReferenceDto } from 'src/dto/reference.dto';
import { Gender } from '../../db/resources/gender';
import { CommunicationDto } from './communication.dto';

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

  @ApiProperty({
    type: ContactPointDto,
    description: 'A contact detail for the individual',
    example: [
      {
        use: 'home',
        system: 'phone',
        value: '(653) 410-0715',
      },
    ],
    isArray: true,
  })
  telecom: ContactPointDto[];

  @ApiProperty({
    type: AddressDto,
    description: 'An address for the individual',
    example: [
      {
        use: 'home',
        type: 'postal',
        line: ['944 Hessel Walks'],
        city: 'Port Dexterbury',
        state: 'Alabama',
        postalCode: '77390-8168',
        country: 'Dominica',
      },
    ],
  })
  address: AddressDto[];

  @ApiProperty({
    type: ReferenceDto,
    description: 'Organization that is the custodian of the patient record',
    example: { reference: 'Organization/123-675' },
  })
  managingOrganization: ReferenceDto;

  @ApiProperty({
    type: ReferenceDto,
    description: "Patient's nominated primary care provider",
    example: [{ reference: 'Practitioner/123-675' }],
    isArray: true,
  })
  generalPractitioner: ReferenceDto[];

  @ApiProperty({
    type: CommunicationDto,
    description:
      'A language which may be used to communicate with the patient about his or her health',
    example: [
      {
        language: {
          coding: [
            {
              code: 'en-GB',
              system: 'urn:ietf:bcp:47',
              display: 'English (Great Britain)',
            },
          ],
        },
        preferred: true,
      },
    ],
    isArray: true,
  })
  communication: CommunicationDto[];
}
