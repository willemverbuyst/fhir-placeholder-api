import type { Condition } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string | undefined }) {
  if (!patientId) return null;

  return (
    <ResourcesRenderer<Condition>
      resourceType="Condition"
      searchParams={`?patient=${patientId}`}
      renderItem={(resource) => <Episodes conditionId={resource.id} />}
    />
  );
}
