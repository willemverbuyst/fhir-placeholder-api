import { faker } from '@faker-js/faker';
import { Condition } from 'fhir/r5';
import { getRandomElement } from '../utils/getRandomElement';

export function createCondition(patientId: string, episodeId: number) {
  const newCondition: Condition = {
    id: episodeId.toString(),
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

  return newCondition;
}
