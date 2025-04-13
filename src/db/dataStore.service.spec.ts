import {
  NUMBER_OF_ENCOUNTERS_PER_PATIENT,
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_OBSERVATIONS_PER_ENCOUNTER,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS_PER_ORGANIZATION,
  NUMBER_OF_PRACTITIONERS,
} from './dataStore.config';
import { DataStoreService } from './dataStore.service';

describe('DataStoreService', () => {
  let dataStoreService: DataStoreService;

  beforeEach(() => {
    dataStoreService = new DataStoreService();
  });

  it('should initialize organizations with the correct number of items', () => {
    expect(dataStoreService.organizations.length).toBe(NUMBER_OF_ORGANIZATIONS);
  });

  it('should initialize practitioners with the correct number of items', () => {
    expect(dataStoreService.practitioners.length).toBe(
      NUMBER_OF_PRACTITIONERS * NUMBER_OF_ORGANIZATIONS,
    );
  });

  it('should initialize patients with the correct number of items', () => {
    expect(dataStoreService.patients.length).toBe(
      NUMBER_OF_PATIENTS_PER_ORGANIZATION * NUMBER_OF_ORGANIZATIONS,
    );
  });

  it('should initialize conditions for each patient', () => {
    const expectedConditionsCount =
      NUMBER_OF_PATIENTS_PER_ORGANIZATION *
      NUMBER_OF_ORGANIZATIONS *
      NUMBER_OF_EPISODES_PER_PATIENT;
    expect(dataStoreService.conditions.length).toBe(expectedConditionsCount);
  });

  it('should initialize episodes for each patient', () => {
    const expectedEpisodesCount =
      NUMBER_OF_PATIENTS_PER_ORGANIZATION *
      NUMBER_OF_ORGANIZATIONS *
      NUMBER_OF_EPISODES_PER_PATIENT;
    expect(dataStoreService.episodes.length).toBe(expectedEpisodesCount);
  });

  it('should initialize encounters for each patient', () => {
    const expectedEncountersCount =
      NUMBER_OF_PATIENTS_PER_ORGANIZATION *
      NUMBER_OF_ORGANIZATIONS *
      NUMBER_OF_ENCOUNTERS_PER_PATIENT;
    expect(dataStoreService.encounters.length).toBe(expectedEncountersCount);
  });

  it('should initialize observations for each patient', () => {
    const expectedObservationsCount =
      NUMBER_OF_PATIENTS_PER_ORGANIZATION *
      NUMBER_OF_ORGANIZATIONS *
      NUMBER_OF_ENCOUNTERS_PER_PATIENT *
      NUMBER_OF_OBSERVATIONS_PER_ENCOUNTER;
    expect(dataStoreService.observations.length).toBe(
      expectedObservationsCount,
    );
  });
});
