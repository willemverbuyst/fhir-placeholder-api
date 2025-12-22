import { isTruthyString } from "@repo/utils";
import type { Organization } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { PractitionerRoles } from "./practitioner-role.resource";

export function Organizations() {
  return (
    <ResourcesRenderer<Organization>
      resourceType="Organization"
      renderItem={(resource) =>
        isTruthyString(resource.id) ? (
          <PractitionerRoles organizationId={resource.id} />
        ) : null
      }
      styles="flex-col"
    />
  );
}
