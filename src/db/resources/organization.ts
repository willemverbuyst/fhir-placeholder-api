import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';
import { Id } from '../../types';
import { createId } from '../../utils/id';

export function createOrganization(index?: number): Organization & Id {
  return {
    id: createId(index),
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };
}
