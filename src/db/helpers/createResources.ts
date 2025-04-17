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
import { createCondition } from '../resources/condition';
import { createEncounter } from '../resources/encounter';
import { createEpisode } from '../resources/episode-of-care';
import { createObservation } from '../resources/observation';
import { createOrganization } from '../resources/organization';
import { createPatient } from '../resources/patient';
import { createPractitioner } from '../resources/practitioner';

export function createOrganizations({
  numberOfOrganizations,
}: {
  numberOfOrganizations: number;
}): (Organization & Id)[] {
  return Array.from({ length: numberOfOrganizations }, (_, i) => {
    return createOrganization(`organization-${i + 1}`);
  });
}

export function createPractitioners({
  numberOfPractitioners,
}: {
  numberOfPractitioners: number;
}): (Practitioner & Id)[] {
  return Array.from({ length: numberOfPractitioners }, (_, i) => {
    return createPractitioner(`practitioner-${i + 1}`);
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
      return createPatient(
        `organization-${
          Math.floor(i / (numberOfPatients / numberOfOrganizations)) + 1
        }`,
        `practitioner-${
          Math.floor(i / (numberOfPatients / numberOfPractitioners)) + 1
        }`,
        `patient-${i + 1}`,
      );
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
    return createCondition(
      `patient-${Math.floor(i / (numberOfConditions / numberOfPatients)) + 1}`,
      `condition-${i + 1}`,
    );
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
    return createEpisode(
      `patient-${Math.floor(i / (numberOfEpisodes / numberOfPatients)) + 1}`,
      `condition-${i + 1}`,
      `episode-of-care-${i + 1}`,
    );
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
    return createEncounter(
      `patient-${Math.floor(i / (numberOfEncounters / numberOfPatients)) + 1}`,
      `episode-of-care-${
        Math.floor(i / (numberOfEpisodes / numberOfPatients)) + 1
      }`,
      `encounter-${i + 1}`,
    );
  });
}

export function createObservations(
  numberOfObservations: number,
  encountersPerPatient: number,
  observationsPerEncounter: number,
): (Observation & Id)[] {
  return Array.from({ length: numberOfObservations }, (_, i) => {
    return createObservation(
      `patient-${
        Math.floor(i / (encountersPerPatient * observationsPerEncounter)) + 1
      }`,
      `encounter-${Math.floor(i / observationsPerEncounter) + 1}`,
      `observation-${i + 1}`,
    );
  });
}
