import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';
import { Id } from '../../types';

export function createOrganization(id: string): Organization & Id {
  return {
    id,
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };
}
