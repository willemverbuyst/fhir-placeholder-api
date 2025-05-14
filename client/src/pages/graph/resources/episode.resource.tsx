import type { EpisodeOfCare } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Encounters } from "./encounter.resource";

export function Episodes({ conditionId }: { conditionId: string | undefined }) {
  if (!conditionId) return null;

  return (
    <ResourcesRenderer<EpisodeOfCare>
      url={`EpisodeOfCare?diagnosis-reference=${conditionId}`}
      className={`${FHIR_RESOURCES.EpisodeOfCare.bgColor}`}
      renderItem={(resource) => <Encounters episodeId={resource.id} />}
    />
  );
}
