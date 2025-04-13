import { Injectable } from '@nestjs/common';
import {
  Condition,
  Encounter,
  EpisodeOfCare,
  Organization,
  Patient,
  Practitioner,
} from 'fhir/r5';
import {
  NUMBER_OF_ENCOUNTERS_PER_PATIENT,
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
} from './dataStore.config';
import {
  createConditions,
  createEncounters,
  createEpisodes,
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

      // Check if patientId is to satisfy TypeScript
      /* istanbul ignore next */
      if (!patientId) {
        throw new Error('Patient ID is missing in createEpisodesForPatients');
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
    });
  }
}
