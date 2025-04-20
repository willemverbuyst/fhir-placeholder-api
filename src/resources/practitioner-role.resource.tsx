import { PractitionerRole } from "fhir/r5";
import { ResourcesRenderer } from "../components/ResourcesRenderer";
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
      queryKeys={["practitionerRole", organizationId]}
      className="bg-amber-600"
      renderItem={(resource) => (
        <PractitionerResource
          practitionerId={resource.practitioner?.reference?.split("/")[1]}
        />
      )}
    />
  );
}
