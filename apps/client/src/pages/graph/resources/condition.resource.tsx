import { isString } from "@repo/utils";
import type { Condition } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Episodes } from "./episode.resource";

export function Conditions({ patientId }: { patientId: string }) {
  return (
    <ResourcesRenderer<Condition>
      resourceType="Condition"
      searchParams={`?patient=${patientId}`}
      renderItem={(resource) =>
        isString(resource.id) ? <Episodes conditionId={resource.id} /> : null
      }
    />
  );
}
