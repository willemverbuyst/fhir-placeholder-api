import { createEncounter, EncounterStatus } from './encounter';

describe('createEncounter', () => {
  it('should create an Encounter with the correct structure', () => {
    const patientId = 'patient-1';
    const episodeIds = ['episode-1', 'episode-2', 'episode-3'];
    const encounter = createEncounter(patientId, episodeIds);

    expect(encounter).toHaveProperty('id');
    expect(encounter.resourceType).toBe('Encounter');
    expect(Object.values(EncounterStatus)).toContain(encounter.status);
    expect(encounter.subject).toEqual({ reference: `Patient/${patientId}` });
    expect(encounter.episodeOfCare).toHaveLength(1);

    if (!encounter.episodeOfCare) {
      throw new Error('Encounter episodeOfCare array is empty');
    }

    expect(episodeIds).toContain(
      encounter.episodeOfCare[0].reference?.split('/')[1],
    );
  });

  it('should generate a unique id for each Encounter', () => {
    const patientId = 'patient-1';
    const episodeIds = ['episode-1', 'episode-2', 'episode-3'];

    const encounter1 = createEncounter(patientId, episodeIds);
    const encounter2 = createEncounter(patientId, episodeIds);

    expect(encounter1.id).not.toBe(encounter2.id);
  });
});
