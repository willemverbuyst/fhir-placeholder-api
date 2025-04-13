import { episodeOfCareTypes } from '../valueSets/episode-of-care-type-value-set';
import { createEpisode, EpisodeOfCareStatus } from './episode-of-care';

describe('createEpisode', () => {
  it('should create an EpisodeOfCare with the correct structure', () => {
    const patientId = '12345';
    const conditionId = '67890';
    const episode = createEpisode(patientId, conditionId);

    expect(episode).toHaveProperty('id');
    expect(episode.resourceType).toBe('EpisodeOfCare');
    expect(Object.values(EpisodeOfCareStatus)).toContain(episode.status);
    expect(episode.patient).toEqual({ reference: `Patient/${patientId}` });
    expect(episode.diagnosis).toHaveLength(1);

    if (!episode.diagnosis) {
      throw new Error('EpisodeOfCare diagnosis array is empty');
    }

    if (!episode.diagnosis[0]?.condition) {
      throw new Error('EpisodeOfCare diagnosis[0].condition array is empty');
    }

    expect(episode.diagnosis[0].condition[0].reference).toEqual({
      reference: `Condition/${conditionId}`,
    });

    if (!episode.type) {
      throw new Error('EpisodeOfCare type array is empty');
    }

    expect(episode.type).toHaveLength(1);
    expect(episode.type[0].coding).toHaveLength(1);
  });

  it('should generate a unique id for each EpisodeOfCare', () => {
    const patientId = '12345';
    const conditionId = '67890';
    const episode1 = createEpisode(patientId, conditionId);
    const episode2 = createEpisode(patientId, conditionId);

    expect(episode1.id).not.toBe(episode2.id);
  });

  it('should select a random type from the episodeOfCareTypes value set', () => {
    const patientId = '12345';
    const conditionId = '67890';
    const episode = createEpisode(patientId, conditionId);

    if (!episode.type) {
      throw new Error('EpisodeOfCare type array is empty');
    }

    if (!episode.type[0]?.coding) {
      throw new Error('EpisodeOfCare type[0].coding array is empty');
    }

    expect(episodeOfCareTypes).toContainEqual(episode.type[0].coding[0]);
  });
});
