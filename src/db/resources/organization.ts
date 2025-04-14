import { faker } from '@faker-js/faker';
import { Organization } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { Id } from '../../types';
import { isTest } from '../../utils/environment';

export function createOrganization(index?: number): Organization & Id {
  return {
    id: isTest ? String(index) : uuidV4(),
    resourceType: 'Organization',
    name: faker.company.name(),
    active: true,
  };
}
