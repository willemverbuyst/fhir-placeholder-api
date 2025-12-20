import { isString } from "@repo/utils";
import type { EpisodeOfCare } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Encounters } from "./encounter.resource";

export function Episodes({ conditionId }: { conditionId: string }) {
  return (
    <ResourcesRenderer<EpisodeOfCare>
      resourceType="EpisodeOfCare"
      searchParams={`?diagnosis-reference=${conditionId}`}
      renderItem={(resource) =>
        isString(resource.id) ? <Encounters episodeId={resource.id} /> : null
      }
    />
  );
}
