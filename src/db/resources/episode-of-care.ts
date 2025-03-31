import { EpisodeOfCare } from 'fhir/r5';
import { getRandomElement } from '../utils/getRandomElement';
import { episodeOfCareTypes } from '../valueSets/episode-of-care-type-value-set';

export function createEpisode(
  patientId: string,
  episodeId: number,
  conditionId: string,
) {
  const newEpisode: EpisodeOfCare = {
    id: episodeId.toString(),
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
