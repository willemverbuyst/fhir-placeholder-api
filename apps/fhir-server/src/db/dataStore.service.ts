import { Injectable } from "@nestjs/common";
import { generateResources } from "@repo/dummy-data";
import type {
  AllergyIntolerance,
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
import { dummyDataConfig } from "../../scripts/dummyDataConfig";

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
  public allergies: AllergyIntolerance[] = [];

  constructor() {
    const resources = generateResources(dummyDataConfig);

    this.allergies = resources.allergies;
    this.appointments = resources.appointments;
    this.conditions = resources.conditions;
    this.encounters = resources.encounters;
    this.episodes = resources.episodes;
    this.observations = resources.observations;
    this.organizations = resources.organizations;
    this.patients = resources.patients;
    this.practitioners = resources.practitioners;
    this.practitionerRoles = resources.practitionerRoles;
  }
}
