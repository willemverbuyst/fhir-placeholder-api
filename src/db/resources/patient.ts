import { faker } from '@faker-js/faker';
import { Patient } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { START_DATE } from '../dataStore.config';
import { createAddress } from '../helpers/address';
import { createEmail, createPhone } from '../helpers/contactPoint';
import { getRandomElement } from '../helpers/getRandomElement';
import { languages } from '../valueSets/languages-value-set';
import { Gender } from './gender';

export function createPatient(
  organizationId: string,
  practitionerIds: string[],
) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const newPatient: Patient = {
    id: uuidV4(),
    name: [{ family: lastName, given: [firstName] }],
    resourceType: 'Patient',
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split('T')[0],
    gender: getRandomElement([
      Gender.MALE,
      Gender.FEMALE,
      Gender.UNKNOWN,
      Gender.OTHER,
    ]),
    telecom: [createEmail(firstName, lastName), createPhone()],
    address: [createAddress()],
    managingOrganization: { reference: `Organization/${organizationId}` },
    generalPractitioner: [
      {
        reference: `Practitioner/${getRandomElement(practitionerIds)}`,
      },
    ],
    communication: [
      {
        language: { coding: [getRandomElement(languages)] },
        preferred: true,
      },
    ],
  };

  return newPatient;
}
