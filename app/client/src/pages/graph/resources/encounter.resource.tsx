import type { Encounter } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string | undefined }) {
  if (!episodeId) return null;

  return (
    <ResourcesRenderer<Encounter>
      resourceType="Encounter"
      searchParams={`?episode-of-care=${episodeId}`}
      renderItem={(resource) => <Observations encounterId={resource.id} />}
    />
  );
}
