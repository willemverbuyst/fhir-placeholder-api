import { faker } from '@faker-js/faker';
import { START_DATE } from '../config';
import { createAddress } from '../helpers/address';
import { createEmail, createPhone } from '../helpers/contactPoint';
import { PatientWithId } from '../models';
import { getRandomElement } from '../utils/getRandomElement';
import { languages } from '../valueSets/languages-value-set';

export function createPatient(
  patientId: number,
  organizationId: number,
  practitionerIds: string[],
) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const newPatient: PatientWithId = {
    id: patientId.toString(),
    name: [{ family: lastName, given: [firstName] }],
    resourceType: 'Patient',
    birthDate: faker.date
      .between({ from: START_DATE, to: Date.now() })
      .toISOString()
      .split('T')[0],
    gender: getRandomElement(['male', 'female', 'other', 'unknown']),
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
