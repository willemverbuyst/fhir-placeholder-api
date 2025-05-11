import type { Organization } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { PractitionerRoles } from "./practitioner-role.resource";

export function Organizations() {
  return (
    <ResourcesRenderer<Organization>
      url={"Organization"}
      className="bg-amber-950"
      renderItem={(resource) => (
        <PractitionerRoles organizationId={resource.id} />
      )}
    />
  );
}
