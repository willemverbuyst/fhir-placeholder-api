import { isTruthyString } from "@repo/utils";
import type { Practitioner } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string;
}) {
  return (
    <ResourcesRenderer<Practitioner>
      resourceType="Practitioner"
      searchParams={`/${practitionerId}`}
      renderItem={(resource) =>
        isTruthyString(resource.id) ? (
          <Patients practitionerId={resource.id} />
        ) : null
      }
    />
  );
}
