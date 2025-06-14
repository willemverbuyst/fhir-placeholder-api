import type { PractitionerRole } from "fhir/r5";
import type { Id } from "../types";

export function createPractitionerRole({
  practitionerRoleId,
  organizationId,
  practitionerId,
}: {
  practitionerRoleId: string;
  organizationId: string;
  practitionerId: string;
}): PractitionerRole & Id {
  return {
    id: practitionerRoleId,
    resourceType: "PractitionerRole",
    organization: { reference: `Organization/${organizationId}` },
    practitioner: { reference: `Practitioner/${practitionerId}` },
    active: true,
  };
}
