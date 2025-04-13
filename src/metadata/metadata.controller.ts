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
              type: 'Encounter',
              interaction: [{ code: 'search-type' }],
            },
            {
              type: 'Observation',
              interaction: [{ code: 'search-type' }],
            },
            {
              type: 'EpisodeOfCare',
              interaction: [{ code: 'read' }, { code: 'search-type' }],
              searchParam: [
                {
                  name: 'patient',
                  definition:
                    'http://hl7.org/fhir/SearchParameter/EpisodeOfCare-patient',
                  type: 'reference',
                  documentation: 'Search episodes by patient reference',
                },
              ],
            },
            {
              type: 'Organization',
              interaction: [
                { code: 'read' },
                { code: 'search-type' },
                { code: 'create' },
                { code: 'patch' },
              ],
              searchParam: [
                {
                  name: 'name',
                  definition:
                    'http://hl7.org/fhir/SearchParameter/Organization-name',
                  type: 'string',
                  documentation: 'Search by organization name',
                },
              ],
            },
            {
              type: 'Patient',
              interaction: [{ code: 'read' }, { code: 'search-type' }],
              searchParam: [
                {
                  name: 'general-practitioner',
                  definition:
                    'http://hl7.org/fhir/SearchParameter/Patient-general-practitioner',
                  type: 'reference',
                  documentation:
                    "Patient's nominated general practitioner, not the organization that manages the record",
                },
                {
                  name: 'organization',
                  definition:
                    'http://hl7.org/fhir/SearchParameter/Patient-organization',
                  type: 'reference',
                  documentation:
                    'The organization that is the custodian of the patient record',
                },
              ],
            },
            {
              type: 'Practitioner',
              interaction: [{ code: 'read' }, { code: 'search-type' }],
            },
          ],
        },
      ],
    };
  }
}
