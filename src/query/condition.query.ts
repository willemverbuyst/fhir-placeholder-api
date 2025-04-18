import { queryOptions } from "@tanstack/react-query";
import { Bundle, Condition } from "fhir/r5";

export function createGetConditionsForPatientQueryOptions(patientId: string) {
  return queryOptions({
    queryKey: ["conditions", "patient", patientId],
    queryFn: () => fetchConditionsForPatient(patientId),
  });
}

export async function fetchConditionsForPatient(
  patientId: string
): Promise<Bundle<Condition>> {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Condition?patient=${patientId}`
  );

  return await response.json();
}
