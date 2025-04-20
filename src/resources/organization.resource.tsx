import { Organization } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
import { PractitionerRoles } from "./practitioner-role.resource";

export function Organizations() {
  return (
    <ResourcesRenderer<Organization>
      url={"Organization"}
      className="bg-amber-800"
      renderItem={(resource) => (
        <PractitionerRoles organizationId={resource.id} />
      )}
    />
  );
}
