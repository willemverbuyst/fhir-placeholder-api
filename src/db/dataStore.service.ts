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
  createEpisodesWithConditions,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './helpers/createResources';

@Injectable()
export class DataStoreService {
  public patients: Patient[];
  public episodes: EpisodeOfCare[];
  public conditions: Condition[];
  public organizations: Organization[];
  public practitioners: Practitioner[];

  constructor() {
    this.organizations = createOrganizations(NUMBER_OF_ORGANIZATIONS);
    this.practitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);

    const newPractitionerIds = this.practitioners
      .map((p) => p.id)
      .filter((p): p is string => !!p);
    const newOrganizationIds = this.organizations.map((o) => o.id);
    const firstNewOrganizationId = newOrganizationIds[0];

    if (!firstNewOrganizationId) {
      throw new Error(
        'First organization ID is missing in DataStoreService constructor',
      );
    }

    this.patients = createPatients(
      NUMBER_OF_PATIENTS,
      firstNewOrganizationId,
      newPractitionerIds,
    );

    this.episodes = [];
    this.conditions = [];
    this.patients.forEach((p) => {
      const patientId = p.id;
      if (!patientId) {
        throw new Error('Patient ID is missing in createEpisodesForPatients');
      }

      const { newConditions, newEpisodes } = createEpisodesWithConditions(
        NUMBER_OF_EPISODES_PER_PATIENT,
        patientId,
      );

      this.episodes.push(...newEpisodes);
      this.conditions.push(...newConditions);
    });
  }
}
