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

export function createPractitionerRoles({
  numberOfPractitionerRoles,
  numberOfOrganizations,
}: {
  numberOfPractitionerRoles: number;
  numberOfOrganizations: number;
}): (PractitionerRole & Id)[] {
  return Array.from({ length: numberOfPractitionerRoles }, (_, i) => {
    return createPractitionerRole({
      practitionerRoleId: `practitioner-role-${i + 1}`,
      organizationId: `organization-${
        Math.floor(i / (numberOfPractitionerRoles / numberOfOrganizations)) + 1
      }`,
      practitionerId: `practitioner-${i + 1}`,
    });
  });
}
