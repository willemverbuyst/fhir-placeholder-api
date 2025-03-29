import { dataStore } from "../data/index.ts";
import {
  ConditionWithId,
  EpisodeOfCareWithId,
  OrganizationWithId,
  PatientWithId,
  PractitionerWithId,
} from "../models/data.ts";
import { ConditionService } from "./condition-service.ts";
import { getEpisodesForPatientFromDataStore } from "./episode-services.ts";
import { getOrganizationFromDataStore } from "./organization-services.ts";
import { getPractitionerFromDataStore } from "./practitioner-services.ts";

export function getPatientFromDataStore(id: string) {
  return dataStore.patients.find((p) => p.id === id);
}

export function getPatientsFromDataStore() {
  return dataStore.patients;
}

export function getEverythingForPatient(id: string) {
  const resources: (
    | PatientWithId
    | OrganizationWithId
    | EpisodeOfCareWithId
    | ConditionWithId
    | PractitionerWithId
  )[] = [];
  const patient = getPatientFromDataStore(id);

  if (!patient) {
    return resources;
  }

  resources.push(patient);

  const organizationId = patient.managingOrganization?.reference?.split("/")[1];

  if (organizationId) {
    const organization = getOrganizationFromDataStore(organizationId);
    organization && resources.push(organization);
  }

  patient.generalPractitioner?.forEach((gp) => {
    const practitionerId = gp.reference?.split("/")[1];
    if (practitionerId) {
      const practitioner = getPractitionerFromDataStore(practitionerId);
      practitioner && resources.push(practitioner);
    }
  });

  const episodes = getEpisodesForPatientFromDataStore(id);
  resources.push(...episodes);
  const conditionService = new ConditionService(dataStore);
  const conditions = conditionService.getByPatientId(id);
  resources.push(...conditions);

  return resources.filter(Boolean);
}
