import { Encounter } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { Id } from '../../types';
import { isTest } from '../../utils/environment';
import { getRandomElement } from '../helpers/getRandomElement';

export enum EncounterStatus {
  PLANNED = 'planned',
  IN_PROGRESS = 'in-progress',
  ON_HOLD = 'on-hold',
  DISCHARGED = 'discharged',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
  DISCONTINUED = 'discontinued',
  ENTERED_IN_ERROR = 'entered-in-error',
  UNKNOWN = 'unknown',
}

export function createEncounter(
  patientId: string,
  episodes: string[],
  index?: number,
): Encounter & Id {
  return {
    id: isTest ? String(index) : uuidV4(),
    resourceType: 'Encounter',
    status: getRandomElement([
      EncounterStatus.CANCELLED,
      EncounterStatus.COMPLETED,
      EncounterStatus.DISCHARGED,
      EncounterStatus.DISCONTINUED,
      EncounterStatus.ENTERED_IN_ERROR,
      EncounterStatus.IN_PROGRESS,
      EncounterStatus.ON_HOLD,
      EncounterStatus.PLANNED,
      EncounterStatus.UNKNOWN,
    ]),
    subject: { reference: `Patient/${patientId}` },
    episodeOfCare: [
      { reference: `EpisodeOfCare/${getRandomElement(episodes)}` },
    ],
  };
}
