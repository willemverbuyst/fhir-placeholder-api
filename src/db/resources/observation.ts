import { faker } from '@faker-js/faker';
import { Observation } from 'fhir/r5';
import { Id } from 'src/types';
import { v4 as uuidV4 } from 'uuid';
import { getRandomElement } from '../helpers/getRandomElement';
import { observationCodes } from '../valueSets/observation-code-value-set';

export enum ObservationStatus {
  REGISTERED = 'registered',
  PRELIMINARY = 'preliminary',
  FINAL = 'final',
  AMENDED = 'amended',
  CORRECTED = 'corrected',
  CANCELLED = 'cancelled',
  ENTERED_IN_ERROR = 'entered-in-error',
  UNKNOWN = 'unknown',
}

export function createObservation(
  patientId: string,
  encounterId: string,
): Observation & Id {
  return {
    id: uuidV4(),
    resourceType: 'Observation',
    status: getRandomElement([
      ObservationStatus.AMENDED,
      ObservationStatus.CANCELLED,
      ObservationStatus.CORRECTED,
      ObservationStatus.ENTERED_IN_ERROR,
      ObservationStatus.FINAL,
      ObservationStatus.PRELIMINARY,
      ObservationStatus.REGISTERED,
      ObservationStatus.UNKNOWN,
    ]),
    code: { coding: [getRandomElement(observationCodes)] },
    encounter: { reference: `Encounter/${encounterId}` },
    subject: { reference: `Patient/${patientId}` },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
  };
}
