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
import { createAppointment } from "../resources/appointment";
import { createCondition } from "../resources/condition";
import { createEncounter } from "../resources/encounter";
import { createEpisode } from "../resources/episode-of-care";
import { createObservation } from "../resources/observation";
import { createOrganization } from "../resources/organization";
import { createPatient } from "../resources/patient";
import { createPractitioner } from "../resources/practitioner";
import { createPractitionerRole } from "../resources/practitioner-role";
import type { Id } from "../types";

export function createOrganizations({
  numberOfOrganizations,
}: {
  numberOfOrganizations: number;
}): (Organization & Id)[] {
  return Array.from({ length: numberOfOrganizations }, (_, i) => {
    return createOrganization({ id: `organization-${i + 1}` });
  });
}

export function createPractitionerRoles({
  numberOfPractitionerRoles,
  numberOfOrganizations,
}: {
  numberOfPractitionerRoles: number;
  numberOfOrganizations: number;
}): (PractitionerRole & Id)[] {
  return Array.from({ length: numberOfPractitionerRoles }, (_, i) => {
    return createPractitionerRole({
      practitionerRoleId: `practitioner-role-${i + 1}`,
      organizationId: `organization-${
        Math.floor(i / (numberOfPractitionerRoles / numberOfOrganizations)) + 1
      }`,
      practitionerId: `practitioner-${i + 1}`,
    });
  });
}

export function createPractitioners({
  numberOfPractitioners,
}: {
  numberOfPractitioners: number;
}): (Practitioner & Id)[] {
  return Array.from({ length: numberOfPractitioners }, (_, i) => {
    return createPractitioner({ id: `practitioner-${i + 1}` });
  });
}

export function createPatients({
  numberOfPatients,
  numberOfOrganizations,
  numberOfPractitioners,
}: {
  numberOfPatients: number;
  numberOfOrganizations: number;
  numberOfPractitioners: number;
}): (Patient & Id)[] {
  return Array.from(
    {
      length: numberOfPatients,
    },
    (_, i) => {
      return createPatient({
        organizationId: `organization-${
          Math.floor(i / (numberOfPatients / numberOfOrganizations)) + 1
        }`,
        practitionerId: `practitioner-${
          Math.floor(i / (numberOfPatients / numberOfPractitioners)) + 1
        }`,
        id: `patient-${i + 1}`,
      });
    },
  );
}

export function createConditions({
  numberOfConditions,
  numberOfPatients,
}: {
  numberOfConditions: number;
  numberOfPatients: number;
}): (Condition & Id)[] {
  return Array.from({ length: numberOfConditions }, (_, i) => {
    return createCondition({
      patientId: `patient-${Math.floor(i / (numberOfConditions / numberOfPatients)) + 1}`,
      id: `condition-${i + 1}`,
    });
  });
}

export function createEpisodes({
  numberOfEpisodes,
  numberOfPatients,
}: {
  numberOfEpisodes: number;
  numberOfPatients: number;
}): (EpisodeOfCare & Id)[] {
  return Array.from({ length: numberOfEpisodes }, (_, i) => {
    return createEpisode({
      patientId: `patient-${Math.floor(i / (numberOfEpisodes / numberOfPatients)) + 1}`,
      conditionId: `condition-${i + 1}`,
      id: `episode-of-care-${i + 1}`,
    });
  });
}

export function createEncounters({
  numberOfEncounters,
  numberOfPatients,
  numberOfEpisodes,
}: {
  numberOfEncounters: number;
  numberOfPatients: number;
  numberOfEpisodes: number;
}): (Encounter & Id)[] {
  return Array.from({ length: numberOfEncounters }, (_, i) => {
    return createEncounter({
      patientId: `patient-${Math.floor(i / (numberOfEncounters / numberOfPatients)) + 1}`,
      episodeId: `episode-of-care-${
        Math.floor(i / (numberOfEncounters / numberOfEpisodes)) + 1
      }`,
      id: `encounter-${i + 1}`,
    });
  });
}

export function createObservations({
  numberOfObservations,
  numberOfPatients,
  numberOfEncounters,
}: {
  numberOfObservations: number;
  numberOfPatients: number;
  numberOfEncounters: number;
}): (Observation & Id)[] {
  return Array.from({ length: numberOfObservations }, (_, i) => {
    return createObservation({
      patientId: `patient-${
        Math.floor(i / (numberOfObservations / numberOfPatients)) + 1
      }`,
      encounterId: `encounter-${
        Math.floor(i / (numberOfObservations / numberOfEncounters)) + 1
      }`,
      id: `observation-${i + 1}`,
    });
  });
}

export function createAppointments({
  numberOfAppointments,
  numberOfPatients,
  numberOfPractitioners,
}: {
  numberOfAppointments: number;
  numberOfPatients: number;
  numberOfPractitioners: number;
}): (Appointment & Id)[] {
  return Array.from({ length: numberOfAppointments }, (_, i) => {
    return createAppointment({
      patientId: `patient-${Math.floor(i / (numberOfAppointments / numberOfPatients)) + 1}`,
      practitionerId: `practitioner-${
        Math.floor(i / (numberOfAppointments / numberOfPractitioners)) + 1
      }`,
      id: `appointment-${i + 1}`,
    });
  });
}
