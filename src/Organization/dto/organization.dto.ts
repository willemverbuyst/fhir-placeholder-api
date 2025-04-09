import { ApiProperty } from '@nestjs/swagger';
import { Organization } from 'fhir/r5';

export class OrganizationDto implements Organization {
  @ApiProperty({
    type: String,
    description: 'The id of the organization',
    example: '12345-67890',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'The name of the organization',
    example: 'Acme Corporation',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'The status of the organization',
    example: 'active',
  })
  active: boolean;

  @ApiProperty({
    type: String,
    description: 'The type of the resource',
    default: 'Organization',
  })
  resourceType: 'Organization';
}
