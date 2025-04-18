import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPatientsForOrganizationQueryOptions } from "../query/patients.query";
import { PatientResource } from "./patient.resource";

export function Patients({ organizationId }: { organizationId: string }) {
  const { isPending, error, data } = useQuery(
    createGetPatientsForOrganizationQueryOptions(organizationId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section className="p-4">
      <ul className="flex flex-col gap-3">
        {data.entry?.map((e) => (
          <PatientResource entry={e} key={e.resource?.id} />
        ))}
      </ul>
    </section>
  );
}
