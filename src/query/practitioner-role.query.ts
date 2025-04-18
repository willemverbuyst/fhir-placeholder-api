import { queryOptions } from "@tanstack/react-query";
import { Bundle, PractitionerRole } from "fhir/r5";

export function createGetPractitionerRolesForOrganizationQueryOptions(
  organizationId: string
) {
  return queryOptions({
    queryKey: ["practitionerRoles", "organization", organizationId],
    queryFn: () => fetchPractitionerRolesForOrganizations(organizationId),
  });
}

export async function fetchPractitionerRolesForOrganizations(
  organizationId: string
): Promise<Bundle<PractitionerRole>> {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/PractitionerRole?organization=${organizationId}`
  );

  return await response.json();
}
