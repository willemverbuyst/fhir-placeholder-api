import { Encounter } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
import { Observations } from "./observation.resource";

export function Encounters({ episodeId }: { episodeId: string | undefined }) {
  if (!episodeId) return null;

  return (
    <ResourcesRenderer<Encounter>
      url={`Encounter?episode-of-care=${episodeId}`}
      className="bg-green-600"
      renderItem={(resource) => <Observations encounterId={resource.id} />}
    />
  );
}
