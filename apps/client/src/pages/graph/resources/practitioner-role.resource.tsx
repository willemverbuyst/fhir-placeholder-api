import { isTruthyString } from "@repo/utils";
import type { PractitionerRole } from "fhir/r5";
import { ResourcesRenderer } from "../ResourcesRenderer";
import { PractitionerResource } from "./practitioner.resource";

export function PractitionerRoles({
  organizationId,
}: {
  organizationId: string;
}) {
  return (
    <ResourcesRenderer<PractitionerRole>
      resourceType="PractitionerRole"
      searchParams={`?organization=${organizationId}`}
      renderItem={(resource) =>
        isTruthyString(resource.practitioner) ? (
          <PractitionerResource practitionerId={resource.practitioner} />
        ) : null
      }
    />
  );
}
