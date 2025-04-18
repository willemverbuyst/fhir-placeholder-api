import { queryOptions } from "@tanstack/react-query";
import { Bundle, Organization } from "fhir/r5";

export function createGetOrganizationsQueryOptions() {
  return queryOptions({
    queryKey: ["organizations"],
    queryFn: fetchOrganizations,
  });
}

export async function fetchOrganizations(): Promise<Bundle<Organization>> {
  // to mimic a slow response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch("http://localhost:8080/api/v2/r5/Organization");

  return await response.json();
}
