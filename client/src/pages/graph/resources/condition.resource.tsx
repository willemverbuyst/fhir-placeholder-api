import type { Condition } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string | undefined }) {
  if (!patientId) return null;

  return (
    <ResourcesRenderer<Condition>
      url={`Condition?patient=${patientId}`}
      className={`${FHIR_RESOURCES.Condition.bgColor}`}
      renderItem={(resource) => <Episodes conditionId={resource.id} />}
    />
  );
}
