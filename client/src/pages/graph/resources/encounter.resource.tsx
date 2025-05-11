import type { Encounter } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string | undefined }) {
  if (!episodeId) return null;

  return (
    <ResourcesRenderer<Encounter>
      url={`Encounter?episode-of-care=${episodeId}`}
      className={`${FHIR_RESOURCES.Encounter.bgColor}`}
      renderItem={(resource) => <Observations encounterId={resource.id} />}
    />
  );
}
