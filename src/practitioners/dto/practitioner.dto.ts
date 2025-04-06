import { ApiProperty } from '@nestjs/swagger';
import { Practitioner } from 'fhir/r5';
import { Gender } from 'src/db/resources/gender';
import { AddressDto } from 'src/dto/address.dto';
import { ContactPointDto } from 'src/dto/contact-point.dto';
import { HumanNameDto } from 'src/dto/human-name-dto';

export class PractitionerDto implements Practitioner {
  @ApiProperty({
    type: String,
    description: 'The id of the practitioner',
    example: '12345-67890',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The type of the resource',
    default: 'Practitioner',
  })
  resourceType: 'Practitioner';

  @ApiProperty({
    type: HumanNameDto,
    description: 'The name(s) associated with the practitioner',
    example: [{ family: 'Doe', given: ['John'] }],
  })
  name: HumanNameDto[];

  @ApiProperty({
    type: Boolean,
    description: "Whether this practitioner's record is in active use",
    example: true,
  })
  active: boolean;

  @ApiProperty({
    type: String,
    pattern:
      '([0-9]([0-9]([0-9][1-9]|[1-9]0)|[1-9]00)|[1-9]000)(-(0[1-9]|1[0-2])(-(0[1-9]|[1-2][0-9]|3[0-1]))?)?',
    description: 'The date on which the practitioner was born',
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
    description:
      'Address(es) of the practitioner that are not role specific (typically home address)',
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
}
