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
  NUMBER_OF_PATIENTS_PER_ORGANIZATION,
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

    this.organizations.forEach((organization) => {
      const practitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);
      this.practitioners.push(...practitioners);

      const patients = createPatients(
        NUMBER_OF_PATIENTS_PER_ORGANIZATION,
        organization.id,
        this.practitioners,
      );
      this.patients.push(...patients);

      patients.forEach((p) => {
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
    });

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
