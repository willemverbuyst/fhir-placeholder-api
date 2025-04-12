import { observationCodes } from '../valueSets/observation-code-value-set';
import { createObservation } from './observation';

describe('createObservation', () => {
  it('should create an observation with a valid structure', () => {
    const patientId = '12345';
    const encounterId = '67890';
    const observation = createObservation(patientId, encounterId);

    expect(observation).toHaveProperty('id');
    expect(observation).toHaveProperty('resourceType', 'Observation');
    expect([
      'registered',
      'preliminary',
      'final',
      'amended',
      'corrected',
      'cancelled',
      'entered-in-error',
      'unknown',
    ]).toContain(observation.status);
    expect(observation.subject).toEqual({ reference: `Patient/${patientId}` });
    expect(observation.encounter).toEqual({
      reference: `Encounter/${encounterId}`,
    });
    expect(observation.code.coding).toHaveLength(1);

    it('should select a random code from the observationCodes value set', () => {
      const patientId = '12345';
      const encounterId = '67890';
      const observation = createObservation(patientId, encounterId);

      expect(observation.code.coding).toHaveLength(1);

      if (!observation.code.coding) {
        throw new Error('Observation.code.coding is empty');
      }

      expect(observationCodes).toContainEqual(observation.code.coding[0]);
    });
  });
});
