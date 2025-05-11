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
      url={`PractitionerRole?organization=${organizationId}`}
      className="bg-amber-800"
      renderItem={(resource) => (
        <PractitionerResource
          practitionerId={resource.practitioner?.reference?.split("/")[1]}
        />
      )}
    />
  );
}
