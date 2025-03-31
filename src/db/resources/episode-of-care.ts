import { EpisodeOfCare } from 'fhir/r5';
import { v4 as uuidV4 } from 'uuid';
import { getRandomElement } from '../helpers/getRandomElement';
import { episodeOfCareTypes } from '../valueSets/episode-of-care-type-value-set';

export function createEpisode(
  patientId: string,

  conditionId: string,
) {
  const newEpisode: EpisodeOfCare = {
    id: uuidV4(),
    resourceType: 'EpisodeOfCare',
    status: getRandomElement([
      'planned',
      'waitlist',
      'active',
      'onhold',
      'finished',
      'cancelled',
      'entered-in-error',
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

  return newEpisode;
}
