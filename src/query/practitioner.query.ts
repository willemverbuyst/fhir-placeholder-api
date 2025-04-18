import { queryOptions } from "@tanstack/react-query";
import { Practitioner } from "fhir/r5";

export function createGetPractitionerQueryOptions(practitionerId: string) {
  return queryOptions({
    queryKey: ["practitioner", practitionerId],
    queryFn: () => fetchPractitioner(practitionerId),
  });
}

export async function fetchPractitioner(
  practitionerId: string
): Promise<Practitioner> {
  // to mimic a slow response
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Practitioner/${practitionerId}`
  );

  return await response.json();
}
