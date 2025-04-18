import { queryOptions } from "@tanstack/react-query";
import { Bundle, Encounter } from "fhir/r5";

export function createGetEncountersForEpisodeQueryOptions(episodeId: string) {
  return queryOptions({
    queryKey: ["encounters", "episode", episodeId],
    queryFn: () => fetchEncountersForEpisode(episodeId),
  });
}

export async function fetchEncountersForEpisode(
  episodeId: string
): Promise<Bundle<Encounter>> {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Encounter?episode-of-care=${episodeId}`
  );

  return await response.json();
}
