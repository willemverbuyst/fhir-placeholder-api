import { Injectable } from "@nestjs/common";
import { generateResources } from "@repo/dummy-data";
import type {
  Appointment,
  Condition,
  Encounter,
  EpisodeOfCare,
  Observation,
  Organization,
  Patient,
  Practitioner,
  PractitionerRole,
} from "fhir/r5";
import {
  NUMBER_OF_APPOINTMENTS,
  NUMBER_OF_CONDITIONS,
  NUMBER_OF_ENCOUNTERS,
  NUMBER_OF_EPISODES,
  NUMBER_OF_OBSERVATIONS,
  NUMBER_OF_ORGANIZATIONS,
  NUMBER_OF_PATIENTS,
  NUMBER_OF_PRACTITIONERS,
  NUMBER_OF_PRACTITIONER_ROLES,
} from "../../config";

@Injectable()
export class DataStoreService {
  public patients: Patient[] = [];
  public episodes: EpisodeOfCare[] = [];
  public conditions: Condition[] = [];
  public organizations: Organization[] = [];
  public practitioners: Practitioner[] = [];
  public practitionerRoles: PractitionerRole[] = [];
  public encounters: Encounter[] = [];
  public observations: Observation[] = [];
  public appointments: Appointment[] = [];

  constructor() {
    const resources = generateResources({
      numberOfAppointments: NUMBER_OF_APPOINTMENTS,
      numberOfConditions: NUMBER_OF_CONDITIONS,
      numberOfEncounters: NUMBER_OF_ENCOUNTERS,
      numberOfEpisodes: NUMBER_OF_EPISODES,
      numberOfObservations: NUMBER_OF_OBSERVATIONS,
      numberOfOrganizations: NUMBER_OF_ORGANIZATIONS,
      numberOfPatients: NUMBER_OF_PATIENTS,
      numberOfPractitioners: NUMBER_OF_PRACTITIONERS,
      numberOfPractitionerRoles: NUMBER_OF_PRACTITIONER_ROLES,
    });

    this.appointments = resources.appointments;
    this.conditions = resources.conditions;
    this.encounters = resources.encounters;
    this.episodes = resources.episodes;
    this.observations = resources.observations;
    this.organizations = resources.organizations;
    this.patients = resources.patients;
    this.practitioners = resources.practitioners;
    this.practitionerRoles = resources.practitionerRoles;

    if (process.env.NODE_ENV === "development") {
      console.dir(
        {
          patients: this.patients.length,
          episodes: this.episodes.length,
          conditions: this.conditions.length,
          organizations: this.organizations.length,
          practitionerRoles: this.practitionerRoles.length,
          practitioners: this.practitioners.length,
          encounters: this.encounters.length,
          observations: this.observations.length,
          appointments: this.appointments.length,
        },
        { depth: null, colors: true },
      );
    }
  }
}
