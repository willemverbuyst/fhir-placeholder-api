import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger/dist';
import { CapabilityStatement } from 'fhir/r5';

@Controller('metadata')
export class MetadataController {
  @ApiOkResponse({
    description: 'CapabilityStatement',
  })
  @Get()
  getCapabilityStatement(): CapabilityStatement {
    return {
      resourceType: 'CapabilityStatement',
      id: 'capability-statement-api-v2-5r',
      status: 'active',
      date: '2025-04-08',
      kind: 'instance',
      fhirVersion: '5.0.0',
      format: ['json'],
      rest: [
        {
          mode: 'server',
          resource: [
            {
              type: 'Condition',
              interaction: [{ code: 'read' }, { code: 'search-type' }],
            },
            {
              type: 'EpisodeOfCare',
              interaction: [{ code: 'read' }],
            },
            {
              type: 'Organization',
              interaction: [
                { code: 'read' },
                { code: 'create' },
                { code: 'patch' },
              ],
            },
            {
              type: 'Patient',
              interaction: [{ code: 'read' }],
            },
            {
              type: 'Practitioner',
              interaction: [{ code: 'read' }],
            },
          ],
        },
      ],
    };
  }
}
