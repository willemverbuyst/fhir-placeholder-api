import type { PractitionerRole } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
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
      className={`${FHIR_RESOURCES.PractitionerRole.bgColor}`}
      renderItem={(resource) => (
        <PractitionerResource
          practitionerId={resource.practitioner?.reference?.split("/")[1]}
        />
      )}
    />
  );
}
