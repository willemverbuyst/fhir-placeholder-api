import type { Condition } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string | undefined }) {
  if (!patientId) return null;

  return (
    <ResourcesRenderer<Condition>
      url={`Condition?patient=${patientId}`}
      className="bg-violet-500"
      renderItem={(resource) => <Episodes conditionId={resource.id} />}
    />
  );
}
