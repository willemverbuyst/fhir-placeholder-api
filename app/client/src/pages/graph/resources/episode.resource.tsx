import type { EpisodeOfCare } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Encounters } from "./encounter.resource";

export function Episodes({ conditionId }: { conditionId: string | undefined }) {
  if (!conditionId) return null;

  return (
    <ResourcesRenderer<EpisodeOfCare>
      resourceType="EpisodeOfCare"
      searchParams={`?diagnosis-reference=${conditionId}`}
      renderItem={(resource) => <Encounters episodeId={resource.id} />}
    />
  );
}
