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
  PATIENTS_PER_PRACTITIONER,
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
    const numberOfOrganizations = ORGANIZATIONS;
    const numberOfPractitioners =
      PRACTITIONERS_PER_ORGANIZATION * ORGANIZATIONS;
    const numberOfPatients = PATIENTS_PER_PRACTITIONER * numberOfPractitioners;
    const numberOfConditions = numberOfPatients * CONDITIONS_PER_PATIENT;
    const numberOfEpisodes = numberOfPatients * EPISODES_PER_PATIENT;
    const numberOfEncounters = numberOfPatients * ENCOUNTERS_PER_PATIENT;
    const numberOfObservations =
      numberOfEncounters * OBSERVATIONS_PER_ENCOUNTER;

    this.organizations = createOrganizations({
      numberOfOrganizations,
    });
    this.practitioners = createPractitioners({
      numberOfPractitioners,
    });
    this.patients = createPatients({
      numberOfPatients,
      numberOfOrganizations,
      numberOfPractitioners,
    });
    this.conditions = createConditions({
      numberOfConditions,
      numberOfPatients,
    });
    this.episodes = createEpisodes({ numberOfEpisodes, numberOfPatients });
    this.encounters = createEncounters({
      numberOfEncounters,
      numberOfPatients,
      numberOfEpisodes,
    });
    this.observations = createObservations({
      numberOfObservations,
      numberOfPatients,
      numberOfEncounters,
    });

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
