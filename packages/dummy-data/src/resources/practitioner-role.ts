import type { PractitionerRole } from "fhir/r5";

export function createPractitionerRole({
  practitionerRoleId,
  organizationId,
  practitionerId,
}: {
  practitionerRoleId: string;
  organizationId: string;
  practitionerId: string;
}): PractitionerRole {
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
}): PractitionerRole[] {
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
