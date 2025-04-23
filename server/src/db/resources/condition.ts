import { faker } from '@faker-js/faker';
import { Condition } from 'fhir/r5';
import { Id } from '../../types';
import { getRandomElement } from '../helpers/getRandomElement';

export function createCondition(patientId: string, id: string): Condition & Id {
  return {
    id,
    note: [{ text: faker.lorem.sentence({ min: 3, max: 5 }) }],
    resourceType: 'Condition',
    subject: { reference: `Patient/${patientId}` },
    clinicalStatus: {
      coding: [
        {
          code: getRandomElement([
            'active',
            'recurrence',
            'relapse',
            'inactive',
            'remission',
            'resolved',
            'unknown',
          ]),
          system: 'http://terminology.hl7.org/CodeSystem/condition-clinical',
        },
      ],
    },
  };
}
