import type { Observation } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";

export function Observations({
  encounterId,
}: {
  encounterId: string | undefined;
}) {
  if (!encounterId) return null;

  return (
    <ResourcesRenderer<Observation>
      url={`Observation?encounter=${encounterId}`}
      className="bg-pink-600"
    />
  );
}
