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
export class DataStoreService {
  public patients: Patient[];
  public episodes: EpisodeOfCare[];
  public conditions: Condition[];
  public organizations: Organization[];
  public practitioners: Practitioner[];

  constructor() {
    const newOrganizations = createOrganizations(NUMBER_OF_ORGANIZATIONS);
    const newPractitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);
    const newPractitionerIds = newPractitioners
      .map((p) => p.id)
      .filter((p): p is string => !!p);

    const newOrganizationIds = newOrganizations.map((o) => o.id);

    const firstNewOrganizationId = newOrganizationIds[0];

    if (!firstNewOrganizationId) {
      throw new Error(
        'First organization ID is missing in DataStoreService constructor',
      );
    }

    const newPatients = createPatients(
      NUMBER_OF_PATIENTS,
      firstNewOrganizationId,
      newPractitionerIds,
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
