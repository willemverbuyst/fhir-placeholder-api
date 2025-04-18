import { queryOptions } from "@tanstack/react-query";
import { Bundle, EpisodeOfCare } from "fhir/r5";

export function createGetEpisodesForPatientsQueryOptions(patientId: string) {
  return queryOptions({
    queryKey: ["episodes", "patient", patientId],
    queryFn: () => fetchEpisodesForPatient(patientId),
  });
}

export async function fetchEpisodesForPatient(
  patientId: string
): Promise<Bundle<EpisodeOfCare>> {
  // to mimic a slow response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/EpisodeOfCare?patient=${patientId}`
  );

  return await response.json();
}
