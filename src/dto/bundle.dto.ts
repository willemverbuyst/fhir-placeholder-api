import { ApiProperty } from '@nestjs/swagger';
import { Bundle, FhirResource } from 'fhir/r5';
import { EntryDto } from './bundle-entry.dto';

export class BundleDto<T extends FhirResource> implements Bundle {
  @ApiProperty({
    type: String,
    description: 'The type of the resource',
    default: 'Bundle',
  })
  resourceType: 'Bundle';

  @ApiProperty({
    type: String,
    description: 'The type',
    default: 'searchset',
  })
  type: 'searchset';

  @ApiProperty({
    type: Number,
    description: 'The number of entries',
    example: 5,
  })
  total: number;

  @ApiProperty({
    type: EntryDto<T>,
    description: 'The entries',
    isArray: true,
    example: [
      {
        fullUrl:
          'http://localhost:8080/api/v2/r5/Condition/45527ecf-1677-4151-9760-e9905a79dc6d',
        resource: {
          id: '45527ecf-1677-4151-9760-e9905a79dc6d',
          note: [
            {
              text: 'Nostrum aperiam tertius.',
            },
          ],
          resourceType: 'Condition',
          subject: {
            reference: 'Patient/ecd27a93-4343-4b1c-94b9-e8d4190bacaa',
          },
          clinicalStatus: {
            coding: [
              {
                code: 'resolved',
                system:
                  'http://terminology.hl7.org/CodeSystem/condition-clinical',
              },
            ],
          },
        },
      },
    ],
  })
  entry: EntryDto<T>[];
}
