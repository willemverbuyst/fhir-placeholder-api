import { queryOptions } from "@tanstack/react-query";
import { Bundle, EpisodeOfCare } from "fhir/r5";

export function createGetEpisodesForConditionQueryOptions(conditionId: string) {
  return queryOptions({
    queryKey: ["episodes", "condition", conditionId],
    queryFn: () => fetchEpisodesForCondition(conditionId),
  });
}

export async function fetchEpisodesForCondition(
  conditionId: string
): Promise<Bundle<EpisodeOfCare>> {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/EpisodeOfCare?diagnosis-reference=${conditionId}`
  );

  return await response.json();
}
