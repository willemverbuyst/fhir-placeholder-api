import { queryOptions } from "@tanstack/react-query";
import { Bundle, Patient } from "fhir/r5";

export function createGetPatientsForPractitionerQueryOptions(
  practitionerId: string
) {
  return queryOptions({
    queryKey: ["patients", "practitioner", practitionerId],
    queryFn: () => fetchPatientsForPractitioner(practitionerId),
  });
}

export async function fetchPatientsForPractitioner(
  practitionerId: string
): Promise<Bundle<Patient>> {
  const response = await fetch(
    `http://localhost:8080/api/v2/r5/Patient?general-practitioner=${practitionerId}`
  );

  return await response.json();
}
