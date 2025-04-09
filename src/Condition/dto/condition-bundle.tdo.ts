import { ApiProperty } from '@nestjs/swagger';
import { Condition } from 'fhir/r5';
import { EntryDto } from '../../dto/bundle-entry.dto';
import { BundleDto } from '../../dto/bundle.dto';
import { ConditionDto } from './condition.dto';

export class ConditionBundleDto extends BundleDto<Condition> {
  @ApiProperty({
    type: EntryDto<ConditionDto>,
    description: 'The conditions',
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
    isArray: true,
  })
  entry: EntryDto<ConditionDto>[];
}
