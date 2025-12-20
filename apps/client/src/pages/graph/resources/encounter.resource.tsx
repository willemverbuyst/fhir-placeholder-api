import { isTruthyString } from "@repo/utils";
import type { Encounter } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string }) {
  return (
    <ResourcesRenderer<Encounter>
      resourceType="Encounter"
      searchParams={`?episode-of-care=${episodeId}`}
      renderItem={(resource) =>
        isTruthyString(resource.id) ? (
          <Observations encounterId={resource.id} />
        ) : null
      }
    />
  );
}
