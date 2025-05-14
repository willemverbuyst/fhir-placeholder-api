import type { Organization } from "fhir/r5";
import { FHIR_RESOURCES } from "../../../config/fhirResources";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { PractitionerRoles } from "./practitioner-role.resource";

export function Organizations() {
  return (
    <ResourcesRenderer<Organization>
      url={"Organization"}
      className={`${FHIR_RESOURCES.Organization.bgColor}`}
      renderItem={(resource) => (
        <PractitionerRoles organizationId={resource.id} />
      )}
    />
  );
}
