import { dataStore } from "../data/index.ts";
import { getConditionsForPatientFromDataStore } from "./condition-services.ts";
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
  const resources = [];
  const patient = getPatientFromDataStore(id);

  if (!patient) {
    return null;
  }

  resources.push(patient);

  const organizationId = patient.managingOrganization?.reference?.split("/")[1];

  if (organizationId) {
    const organization = getOrganizationFromDataStore(organizationId);
    resources.push(organization);
  }

  const practitioners = patient.generalPractitioner?.map((gp) => {
    const practitionerId = gp.reference?.split("/")[1];
    if (practitionerId) {
      const practitioner = getPractitionerFromDataStore(practitionerId);
      return practitioner;
    }
  });
  resources.push(practitioners);

  const episodes = getEpisodesForPatientFromDataStore(id);
  resources.push(...episodes);
  const conditions = getConditionsForPatientFromDataStore(id);
  resources.push(...conditions);

  return {};
}
