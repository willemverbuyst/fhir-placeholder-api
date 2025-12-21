import type { PractitionerRole } from "fhir/r5";
import { IdGenerator } from "../idGenerator";

export function createPractitionerRole({
  practitionerRoleId,
  organizationId,
  practitionerId,
}: {
  practitionerRoleId: string;
  organizationId: string | undefined;
  practitionerId: string;
}): PractitionerRole {
  return {
    id: practitionerRoleId,
    resourceType: "PractitionerRole",
    organization: organizationId
      ? { reference: `Organization/${organizationId}` }
      : undefined,
    practitioner: { reference: `Practitioner/${practitionerId}` },
    active: true,
  };
}

export function createPractitionerRoles({
  numberOfPractitionerRoles,
  numberOfOrganizations,
  idGen,
}: {
  numberOfPractitionerRoles: number;
  numberOfOrganizations: number;
  idGen: IdGenerator;
}): PractitionerRole[] {
  return Array.from({ length: numberOfPractitionerRoles }, (_, i) => {
    const organizationIndex = Math.floor(
      i / (numberOfPractitionerRoles / numberOfOrganizations),
    );
    return createPractitionerRole({
      practitionerRoleId: idGen.generateId("practitioner-role"),
      organizationId: idGen.refs.get("organization")?.[organizationIndex],
      practitionerId: idGen.generateId("practitioner"),
    });
  });
}
