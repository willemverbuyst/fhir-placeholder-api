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
  NUMBER_OF_CONDITIONS,
  NUMBER_OF_ENCOUNTERS,
  NUMBER_OF_EPISODES,
  NUMBER_OF_OBSERVATIONS,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
} from '../../config';
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
    this.organizations = createOrganizations({
      numberOfOrganizations: NUMBER_OF_ORGANIZATIONS,
    });
    this.practitioners = createPractitioners({
      numberOfPractitioners: NUMBER_OF_PRACTITIONERS,
    });
    this.patients = createPatients({
      numberOfPatients: NUMBER_OF_PATIENTS,
      numberOfOrganizations: NUMBER_OF_ORGANIZATIONS,
      numberOfPractitioners: NUMBER_OF_PRACTITIONERS,
    });
    this.conditions = createConditions({
      numberOfConditions: NUMBER_OF_CONDITIONS,
      numberOfPatients: NUMBER_OF_PATIENTS,
    });
    this.episodes = createEpisodes({
      numberOfEpisodes: NUMBER_OF_EPISODES,
      numberOfPatients: NUMBER_OF_PATIENTS,
    });
    this.encounters = createEncounters({
      numberOfEncounters: NUMBER_OF_ENCOUNTERS,
      numberOfPatients: NUMBER_OF_PATIENTS,
      numberOfEpisodes: NUMBER_OF_EPISODES,
    });
    this.observations = createObservations({
      numberOfObservations: NUMBER_OF_OBSERVATIONS,
      numberOfPatients: NUMBER_OF_PATIENTS,
      numberOfEncounters: NUMBER_OF_ENCOUNTERS,
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
