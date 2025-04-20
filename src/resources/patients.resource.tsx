import { useQuery } from "@tanstack/react-query";
import { List } from "../components/List";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { createGetPatientsForPractitionerQueryOptions } from "../query/patient.query";
import { PatientResource } from "./patient.resource";

export function Patients({ organizationId }: { organizationId: string }) {
  const { isPending, error, data } = useQuery(
    createGetPatientsForPractitionerQueryOptions(organizationId)
  );

  if (isPending) return <LoadingSpinner />;

  if (error) return "An error has occurred: " + error.message;

  if (!data.entry) return null;

  return (
    <List>
      {data.entry.map((e) => (
        <PatientResource entry={e} key={e.resource?.id} />
      ))}
    </List>
  );
}
