import { EpisodeOfCare } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { Id } from '../../types';
import { isTest } from '../../utils/environment';
import { getRandomElement } from '../helpers/getRandomElement';
import { episodeOfCareTypes } from '../valueSets/episode-of-care-type-value-set';

export enum EpisodeOfCareStatus {
  PLANNED = 'planned',
  WAITLIST = 'waitlist',
  ACTIVE = 'active',
  ONHOLD = 'onhold',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
  ENTERED_IN_ERROR = 'entered-in-error',
}

export function createEpisode(
  patientId: string,
  conditionId: string,
  index?: number,
): EpisodeOfCare & Id {
  return {
    id: isTest ? String(index) : uuidV4(),
    resourceType: 'EpisodeOfCare',
    status: getRandomElement([
      EpisodeOfCareStatus.PLANNED,
      EpisodeOfCareStatus.WAITLIST,
      EpisodeOfCareStatus.ACTIVE,
      EpisodeOfCareStatus.ONHOLD,
      EpisodeOfCareStatus.FINISHED,
      EpisodeOfCareStatus.CANCELLED,
      EpisodeOfCareStatus.ENTERED_IN_ERROR,
    ]),
    patient: { reference: `Patient/${patientId}` },
    diagnosis: [
      {
        condition: [
          {
            reference: { reference: `Condition/${conditionId}` },
          },
        ],
      },
    ],
    type: [{ coding: [getRandomElement(episodeOfCareTypes)] }],
  };
}
