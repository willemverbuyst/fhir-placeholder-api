import { faker } from "@faker-js/faker";
import { FLAG_STATUS } from "@repo/fhir-terminology";
import type { Flag } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createFlag({
  patientId,
  encounterId,
  id,
}: {
  patientId: string | undefined;
  encounterId: string | undefined;
  id: string;
}): Flag {
  return {
    id,
    resourceType: "Flag",
    status: faker.helpers.arrayElement(FLAG_STATUS),
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    encounter: {
      reference: encounterId ? `Encounter/${encounterId}` : undefined,
    },
    code: { coding: [] },
  };
}

export function createFlags({
  numberOfFlags,
  numberOfPatients,
  numberOfEncounters,
  idGen,
}: {
  numberOfFlags: number;
  numberOfPatients: number;
  numberOfEncounters: number;
  idGen: IdGenerator;
}): Flag[] {
  return Array.from({ length: numberOfFlags }, (_, i) => {
    const patientIndex = Math.floor(i / (numberOfFlags / numberOfPatients));
    const encounterIndex = Math.floor(i / (numberOfFlags / numberOfEncounters));

    return createFlag({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      encounterId: idGen.refs.get("encounter")?.[encounterIndex],
      id: idGen.generateId("flag"),
    });
  });
}
