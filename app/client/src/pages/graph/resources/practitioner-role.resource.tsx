import type { PractitionerRole } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { PractitionerResource } from "./practitioner.resource";

export function PractitionerRoles({
  organizationId,
}: {
  organizationId: string | undefined;
}) {
  if (!organizationId) return null;

  return (
    <ResourcesRenderer<PractitionerRole>
      resourceType="PractitionerRole"
      searchParams={`?organization=${organizationId}`}
      renderItem={(resource) => (
        <PractitionerResource practitionerId={resource.practitioner} />
      )}
    />
  );
}
