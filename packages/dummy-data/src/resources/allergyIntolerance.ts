import type { AllergyIntolerance } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createAllergy({
  patientId,
  encounterId,
  id,
}: {
  patientId: string | undefined;
  encounterId: string | undefined;
  id: string;
}): AllergyIntolerance {
  return {
    id,
    resourceType: "AllergyIntolerance",
    patient: { reference: `Patient/${patientId}` },
    encounter: { reference: `Encounter/${encounterId}` },
  };
}

export function createAllergies({
  numberOfAllergies,
  numberOfPatients,
  numberOfEncounters,
  idGen,
}: {
  numberOfAllergies: number;
  numberOfPatients: number;
  numberOfEncounters: number;
  idGen: IdGenerator;
}): AllergyIntolerance[] {
  return Array.from({ length: numberOfAllergies }, (_, i) => {
    const patientIndex = Math.floor(i / (numberOfAllergies / numberOfPatients));
    const encounterIndex = Math.floor(
      i / (numberOfAllergies / numberOfEncounters),
    );
    return createAllergy({
      patientId: idGen.refs.get("patient")?.[patientIndex],
      encounterId: idGen.refs.get("encounter")?.[encounterIndex],
      id: idGen.generateId("appointment"),
    });
  });
}
