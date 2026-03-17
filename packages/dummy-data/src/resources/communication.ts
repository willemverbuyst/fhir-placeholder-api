import { faker } from "@faker-js/faker";
import { COMMUNICATION_STATUS } from "@repo/fhir-terminology";
import type { Communication } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createCommunication({
  patientId,
  encounterId,
  id,
}: {
  patientId: string | undefined;
  encounterId: string | undefined;
  id: string;
}): Communication {
  return {
    id,
    resourceType: "Communication",
    status: faker.helpers.arrayElement(COMMUNICATION_STATUS),
    subject: { reference: patientId ? `Patient/${patientId}` : undefined },
    encounter: {
      reference: encounterId ? `Encounter/${encounterId}` : undefined,
    },
    note: [{ text: faker.lorem.sentence({ min: 5, max: 7 }) }],
  };
}

export function createCommunications({
  numberOfCommunications,
  numberOfPatients,
  numberOfEncounters,
  idGen,
}: {
  numberOfCommunications: number;
  numberOfPatients: number;
  numberOfEncounters: number;
  idGen: IdGenerator;
}): Communication[] {
  return Array.from({ length: numberOfCommunications }, (_, i) => {
    const patientIndex = Math.floor(
      i / (numberOfCommunications / numberOfPatients),
    );
    const encounterIndex = Math.floor(
      i / (numberOfCommunications / numberOfEncounters),
    );
    return createCommunication({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      encounterId: idGen.refs.get("encounter")?.[encounterIndex],
      id: idGen.generateId("communication"),
    });
  });
}
