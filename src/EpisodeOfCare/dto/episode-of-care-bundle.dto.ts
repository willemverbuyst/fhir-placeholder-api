import { ApiProperty } from '@nestjs/swagger';
import { EpisodeOfCare } from 'fhir/r5';
import { EntryDto } from '../../dto/bundle-entry.dto';
import { BundleDto } from '../../dto/bundle.dto';
import { EpisodeOfCareDto } from './episode-of-care.dto';

export class EpisodeOfCareBundleDto extends BundleDto<EpisodeOfCare> {
  @ApiProperty({
    type: EntryDto<EpisodeOfCareDto>,
    description: 'The conditions',
    example: [
      {
        fullUrl:
          'http://localhost:8080/api/v2/r5/EpisodeOfCare/ad46542b-5fae-40c1-ae22-7425bdbe5e90',
        resource: {
          id: 'ad46542b-5fae-40c1-ae22-7425bdbe5e90',
          resourceType: 'EpisodeOfCare',
          status: 'entered-in-error',
          patient: {
            reference: 'Patient/b31e8add-fa60-46ae-95e5-366f49061d31',
          },
          diagnosis: [
            {
              condition: [
                {
                  reference: {
                    reference: 'Condition/938e063f-ed73-4b4b-8319-c8cb6aee8b62',
                  },
                },
              ],
            },
          ],
          type: [
            {
              coding: [
                {
                  code: 'diab',
                  system:
                    'http://terminology.hl7.org/CodeSystem/episodeofcare-type',
                  display: 'Post coordinated diabetes program',
                },
              ],
            },
          ],
        },
      },
    ],
    isArray: true,
  })
  entry: EntryDto<EpisodeOfCareDto>[];
}
