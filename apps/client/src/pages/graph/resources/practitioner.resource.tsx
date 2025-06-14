import type { Practitioner } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { Patients } from "./patient.resource";

export function PractitionerResource({
  practitionerId,
}: {
  practitionerId: string | undefined;
}) {
  if (!practitionerId) return null;

  return (
    <ResourcesRenderer<Practitioner>
      resourceType="Practitioner"
      searchParams={`/${practitionerId}`}
      renderItem={(resource) => <Patients practitionerId={resource.id} />}
    />
  );
}
