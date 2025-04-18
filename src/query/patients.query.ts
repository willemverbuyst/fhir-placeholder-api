import { queryOptions } from "@tanstack/react-query";
import { Bundle, Patient } from "fhir/r5";

export function createGetPatientsForOrganizationQueryOptions(
  organizationId: string
) {
  return queryOptions({
    queryKey: ["patients", "organization", organizationId],
    queryFn: () => fetchPatientsForOrganizations(organizationId),
  });
}

export async function fetchPatientsForOrganizations(
  organizationId: string
): Promise<Bundle<Patient>> {
  // to mimic a slow response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Patient?organization=${organizationId}`
  );

  return await response.json();
}
