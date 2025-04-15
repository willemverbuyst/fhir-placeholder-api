import { Injectable } from '@nestjs/common';
import {
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
} from 'fhir/r5';
import { Id } from 'src/types';
import {
  CONDITIONS_PER_PATIENT,
  ENCOUNTERS_PER_PATIENT,
  EPISODES_PER_PATIENT,
  OBSERVATIONS_PER_ENCOUNTER,
  ORGANIZATIONS,
  PATIENTS_PER_ORGANIZATION,
  PRACTITIONERS_PER_ORGANIZATION,
} from './dataStore.config';
import {
  createConditions,
  createEncounters,
  createEpisodes,
  createObservations,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './helpers/createResources';

@Injectable()
export class DataStoreService {
  public patients: (Patient & Id)[] = [];
  public episodes: (EpisodeOfCare & Id)[] = [];
  public conditions: (Condition & Id)[] = [];
  public organizations: (Organization & Id)[] = [];
  public practitioners: (Practitioner & Id)[] = [];
  public encounters: (Encounter & Id)[] = [];
  public observations: (Observation & Id)[] = [];

  constructor() {
    this.organizations = createOrganizations(ORGANIZATIONS);
    this.practitioners = createPractitioners(
      PRACTITIONERS_PER_ORGANIZATION * ORGANIZATIONS,
    );
    this.patients = createPatients(
      PATIENTS_PER_ORGANIZATION * ORGANIZATIONS,
      ORGANIZATIONS,
      (PATIENTS_PER_ORGANIZATION * ORGANIZATIONS) /
        PRACTITIONERS_PER_ORGANIZATION,
    );
    this.conditions = createConditions(
      CONDITIONS_PER_PATIENT * PATIENTS_PER_ORGANIZATION * ORGANIZATIONS,
      CONDITIONS_PER_PATIENT,
    );
    this.episodes = createEpisodes(
      EPISODES_PER_PATIENT * ORGANIZATIONS * PATIENTS_PER_ORGANIZATION,
      EPISODES_PER_PATIENT,
    );
    this.encounters = createEncounters(
      ENCOUNTERS_PER_PATIENT * ORGANIZATIONS * PATIENTS_PER_ORGANIZATION,
      ENCOUNTERS_PER_PATIENT,
      EPISODES_PER_PATIENT,
    );
    this.observations = createObservations(
      OBSERVATIONS_PER_ENCOUNTER *
        ENCOUNTERS_PER_PATIENT *
        ORGANIZATIONS *
        PATIENTS_PER_ORGANIZATION,
      ENCOUNTERS_PER_PATIENT,
      OBSERVATIONS_PER_ENCOUNTER,
    );

    if (process.env.NODE_ENV === 'development') {
      console.dir(
        {
          patients: this.patients.length,
          episodes: this.episodes.length,
          conditions: this.conditions.length,
          organizations: this.organizations.length,
          practitioners: this.practitioners.length,
          encounters: this.encounters.length,
          observations: this.observations.length,
        },
        { depth: null, colors: true },
      );
    }
  }
}
