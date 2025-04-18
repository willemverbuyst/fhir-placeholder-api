import { queryOptions } from "@tanstack/react-query";
import { Bundle, Observation } from "fhir/r5";

export function createGetObservationsForEncounterQueryOptions(
  encounterId: string
) {
  return queryOptions({
    queryKey: ["observations", "encounter", encounterId],
    queryFn: () => fetchObservationsForEncounter(encounterId),
  });
}

export async function fetchObservationsForEncounter(
  encounterId: string
): Promise<Bundle<Observation>> {
  // to mimic a slow response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Observation?encounter=${encounterId}`
  );

  return await response.json();
}
