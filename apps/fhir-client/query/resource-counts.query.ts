import { queryOptions } from "@tanstack/react-query";
import { z } from "zod";

const resourceCountsSchema = z.object({
  patients: z.number(),
  episodes: z.number(),
  conditions: z.number(),
  organizations: z.number(),
  practitioners: z.number(),
  practitionerRoles: z.number(),
  encounters: z.number(),
  observations: z.number(),
  appointments: z.number(),
});

type ResourceCountsSchema = z.infer<typeof resourceCountsSchema>;

export function createResourceCountQueryOptions() {
  return queryOptions({
    queryKey: ["resource-counts"],
    queryFn: () => getResourceCounts(),
    staleTime: 1000 * 60, // 1 minute
  });
}

async function fetchResourceCounts(): Promise<ResourceCountsSchema> {
  const response = await fetch("/api/fhir/$resource-counts");

  if (response.status === 401) {
    throw new Error("Unauthorized");
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch resource counts: ${response.status}`);
  }

  return (await response.json()) as ResourceCountsSchema;
}

async function getResourceCounts(): Promise<ResourceCountsSchema> {
  const rawData = await fetchResourceCounts();

  resourceCountsSchema.parse(rawData);

  return rawData;
}
