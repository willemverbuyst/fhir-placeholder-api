import {
  NUMBER_OF_EPISODES_PER_PATIENT,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
} from './config';
import {
  ConditionWithId,
  EpisodeOfCareWithId,
  OrganizationWithId,
  PatientWithId,
  PractitionerWithId,
} from './models';
import {
  createEpisodesForPatients,
  createOrganizations,
  createPatients,
  createPractitioners,
} from './utils/createResources';

export class DataStore {
  public patients: PatientWithId[];
  public episodes: EpisodeOfCareWithId[];
  public conditions: ConditionWithId[];
  public organizations: OrganizationWithId[];
  public practitioners: PractitionerWithId[];

  constructor() {
    const newOrganizations = createOrganizations(NUMBER_OF_ORGANIZATIONS);
    const newPractitioners = createPractitioners(NUMBER_OF_PRACTITIONERS);
    const newPatients = createPatients(
      NUMBER_OF_PATIENTS,
      1,
      newPractitioners.map((p) => p.id),
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
