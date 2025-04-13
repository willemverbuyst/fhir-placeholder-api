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
  NUMBER_OF_ENCOUNTERS_PER_PATIENT,
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_OBSERVATIONS_PER_ENCOUNTER,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
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
    this.organizations = createOrganizations(NUMBER_OF_ORGANIZATIONS);
    this.practitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);
    this.patients = createPatients(
      NUMBER_OF_PATIENTS,
      this.organizations,
      this.practitioners,
    );

    this.patients.forEach((p) => {
      const patientId = p.id;
      const conditions = createConditions(
        NUMBER_OF_EPISODES_PER_PATIENT,
        patientId,
      );
      this.conditions.push(...conditions);

      const episodes = createEpisodes(patientId, conditions);
      this.episodes.push(...episodes);

      const encounters = createEncounters(
        NUMBER_OF_ENCOUNTERS_PER_PATIENT,
        patientId,
        this.episodes,
      );
      this.encounters.push(...encounters);

      encounters.forEach((encounter) => {
        const observations = createObservations(
          NUMBER_OF_OBSERVATIONS_PER_ENCOUNTER,
          patientId,
          encounter.id,
        );

        this.observations.push(...observations);
      });
    });
  }
}
