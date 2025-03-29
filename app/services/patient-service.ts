import { DataStore } from "../data/index.ts";
import {
  ConditionWithId,
  EpisodeOfCareWithId,
  OrganizationWithId,
  PatientWithId,
  PractitionerWithId,
} from "../models/data.ts";
import { ConditionService } from "./condition-service.ts";
import { EpisodeService } from "./episode-service.ts";
import { OrganizationService } from "./organization-service.ts";
import { PractitionerService } from "./practitioner-service.ts";

export class PatientService {
  constructor(
    private dataStore: DataStore,
    private conditionService: ConditionService,
    private episodeService: EpisodeService,
    private organizationService: OrganizationService,
    private practitionerService: PractitionerService
  ) {}

  getAll() {
    return this.dataStore.patients;
  }

  getById(id: string) {
    return this.dataStore.patients.find((p) => p.id === id);
  }

  getEverythingById(id: string) {
    const resources: (
      | PatientWithId
      | OrganizationWithId
      | EpisodeOfCareWithId
      | ConditionWithId
      | PractitionerWithId
    )[] = [];
    const patient = this.getById(id);

    if (!patient) {
      return resources;
    }

    resources.push(patient);

    const organizationId =
      patient.managingOrganization?.reference?.split("/")[1];

    if (organizationId) {
      const organization = this.organizationService.getById(organizationId);
      organization && resources.push(organization);
    }

    patient.generalPractitioner?.forEach((gp) => {
      const practitionerId = gp.reference?.split("/")[1];
      if (practitionerId) {
        const practitioner = this.practitionerService.getById(practitionerId);
        practitioner && resources.push(practitioner);
      }
    });

    const episodes = this.episodeService.getByPatientId(id);
    resources.push(...episodes);
    const conditions = this.conditionService.getByPatientId(id);
    resources.push(...conditions);

    return resources.filter(Boolean);
  }
}
