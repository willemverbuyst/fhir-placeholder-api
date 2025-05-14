import type { Observation } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";

export function Observations({
  encounterId,
}: {
  encounterId: string | undefined;
}) {
  if (!encounterId) return null;

  return (
    <ResourcesRenderer<Observation>
      url={`Observation?encounter=${encounterId}`}
      className={`${FHIR_RESOURCES.Observation.bgColor}`}
    />
  );
}
