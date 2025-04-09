import { ApiProperty } from '@nestjs/swagger';
import { BundleEntry, FhirResource } from 'fhir/r5';

export class EntryDto<T extends FhirResource> implements BundleEntry {
  @ApiProperty({
    type: String,
    description: 'URI for resource',
    example:
      'http://localhost:8080/api/v2/r5/Condition/45527ecf-1677-4151-9760-e9905a79dc6d',
  })
  fullUrl: string;

  @ApiProperty({
    description: 'The fhir resource',
    example: {
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
            system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
          },
        ],
      },
    },
  })
  resource: T;
}
