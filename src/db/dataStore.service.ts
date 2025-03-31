import { Injectable } from '@nestjs/common';
import {
  Condition,
  EpisodeOfCare,
  Organization,
  Patient,
  Practitioner,
} from 'fhir/r5';
import {
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
} from './dataStore.config';
import {
  createEpisodesForPatients,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './helpers/createResources';

@Injectable()
export class DataStore {
  public patients: Patient[];
  public episodes: EpisodeOfCare[];
  public conditions: Condition[];
  public organizations: Organization[];
  public practitioners: Practitioner[];

  constructor() {
    const newOrganizations = createOrganizations(NUMBER_OF_ORGANIZATIONS);
    const newPractitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);
    const newPatients = createPatients(
      NUMBER_OF_PATIENTS,
      1,
      newPractitioners.map((p) => p.id!),
    );
    const { newConditions, newEpisodes } = createEpisodesForPatients(
      newPatients,
      NUMBER_OF_EPISODES_PER_PATIENT,
    );

    this.organizations = newOrganizations;
    this.practitioners = newPractitioners;
    this.patients = newPatients;
    this.conditions = newConditions;
    this.episodes = newEpisodes;
  }
}
