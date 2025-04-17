import {
  CONDITIONS_PER_PATIENT,
  ENCOUNTERS_PER_PATIENT,
  EPISODES_PER_PATIENT,
  OBSERVATIONS_PER_ENCOUNTER,
  ORGANIZATIONS,
  PATIENTS_PER_PRACTITIONER,
  PRACTITIONERS_PER_ORGANIZATION,
} from './dataStore.config';
import { DataStoreService } from './dataStore.service';

describe('DataStoreService', () => {
  let dataStoreService: DataStoreService;

  beforeEach(() => {
    dataStoreService = new DataStoreService();
  });

  it('should initialize organizations with the correct number of items', () => {
    expect(dataStoreService.organizations.length).toBe(ORGANIZATIONS);
  });

  it('should initialize practitioners with the correct number of items', () => {
    expect(dataStoreService.practitioners.length).toBe(
      PRACTITIONERS_PER_ORGANIZATION * ORGANIZATIONS,
    );
  });

  it('should initialize patients with the correct number of items', () => {
    expect(dataStoreService.patients.length).toBe(
      PATIENTS_PER_PRACTITIONER *
        ORGANIZATIONS *
        PRACTITIONERS_PER_ORGANIZATION,
    );
  });

  it('should initialize conditions for each patient', () => {
    const expectedConditionsCount =
      PATIENTS_PER_PRACTITIONER *
      ORGANIZATIONS *
      PRACTITIONERS_PER_ORGANIZATION *
      CONDITIONS_PER_PATIENT;
    expect(dataStoreService.conditions.length).toBe(expectedConditionsCount);
  });

  it('should initialize episodes for each patient', () => {
    const expectedEpisodesCount =
      PATIENTS_PER_PRACTITIONER *
      ORGANIZATIONS *
      PRACTITIONERS_PER_ORGANIZATION *
      EPISODES_PER_PATIENT;
    expect(dataStoreService.episodes.length).toBe(expectedEpisodesCount);
  });

  it('should initialize encounters for each patient', () => {
    const expectedEncountersCount =
      PATIENTS_PER_PRACTITIONER *
      ORGANIZATIONS *
      PRACTITIONERS_PER_ORGANIZATION *
      ENCOUNTERS_PER_PATIENT;
    expect(dataStoreService.encounters.length).toBe(expectedEncountersCount);
  });

  it('should initialize observations for each patient', () => {
    const expectedObservationsCount =
      PATIENTS_PER_PRACTITIONER *
      ORGANIZATIONS *
      ENCOUNTERS_PER_PATIENT *
      OBSERVATIONS_PER_ENCOUNTER;
    expect(dataStoreService.observations.length).toBe(
      expectedObservationsCount,
    );
  });
});
