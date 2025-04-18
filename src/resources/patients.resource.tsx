import { useQuery } from "@tanstack/react-query";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPatientsForOrganizationQueryOptions } from "../query/patients.query";

export function Patients({ organizationId }: { organizationId: string }) {
  const { isPending, error, data } = useQuery(
    createGetPatientsForOrganizationQueryOptions(organizationId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  return (
    <section>
      <ul className="flex flex-col">
        {data.entry?.map(({ resource }) => (
          <li key={resource?.id}>{resource?.id}</li>
        ))}
      </ul>
    </section>
  );
}
