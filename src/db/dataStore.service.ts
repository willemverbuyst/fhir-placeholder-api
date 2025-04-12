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
  public patients: Patient[] = [];
  public episodes: EpisodeOfCare[] = [];
  public conditions: Condition[] = [];
  public organizations: Organization[] = [];
  public practitioners: Practitioner[] = [];
  public encounters: Encounter[] = [];
  public observations: Observation[] = [];

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
      if (!patientId) {
        throw new Error('Patient ID is missing in creating data store');
      }

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

      encounters.forEach((e) => {
        const encounterId = e.id;
        if (!encounterId) {
          throw new Error('Encounter ID is missing in creating data store');
        }

        const observations = createObservations(
          NUMBER_OF_OBSERVATIONS_PER_ENCOUNTER,
          patientId,
          encounterId,
        );

        this.observations.push(...observations);
      });
    });
  }
}
