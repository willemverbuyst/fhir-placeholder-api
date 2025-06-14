import type { Observation } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";

export function Observations({
  encounterId,
}: {
  encounterId: string | undefined;
}) {
  if (!encounterId) return null;

  return (
    <ResourcesRenderer<Observation>
      resourceType="Observation"
      searchParams={`?encounter=${encounterId}`}
    />
  );
}
